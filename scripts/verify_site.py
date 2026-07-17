#!/usr/bin/env python3
"""Verify Holowan's static navigation, assets, and optionally external links."""

from __future__ import annotations

import argparse
import concurrent.futures
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "site"
REQUIRED_NAV = {
    "play.html",
    "projects.html",
    "tools.html",
    "specs.html",
    "contact.html",
}
FORBIDDEN_PLACEHOLDERS = {
    "r5127": "fabricated build revision",
    "mirror.dantooine": "fabricated mirror",
    "holowanuvd3": "fabricated onion address",
    "placeholderkeymaterial": "placeholder cryptographic key",
    "users online": "fabricated live-user counter",
    "openkotor": "competitor brand (Holowan Underlabs only)",
}


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.hrefs: list[str] = []
        self.assets: list[str] = []
        self.ids: list[str] = []
        self.main_count = 0
        self.h1_count = 0
        self.title_depth = 0
        self.title_text: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if tag == "a" and values.get("href") is not None:
            self.hrefs.append(values["href"] or "")
        if tag in {"link", "script", "img"}:
            asset = values.get("href") if tag == "link" else values.get("src")
            if asset:
                self.assets.append(asset)
        if values.get("id"):
            self.ids.append(values["id"] or "")
        if tag == "main":
            self.main_count += 1
        if tag == "h1":
            self.h1_count += 1
        if tag == "title":
            self.title_depth += 1

    def handle_endtag(self, tag: str) -> None:
        if tag == "title" and self.title_depth:
            self.title_depth -= 1

    def handle_data(self, data: str) -> None:
        if self.title_depth:
            self.title_text.append(data)


def parse_pages() -> tuple[dict[Path, PageParser], list[str], set[str]]:
    pages: dict[Path, PageParser] = {}
    errors: list[str] = []
    external: set[str] = set()

    html_files = sorted(SITE.glob("*.html"))
    if not html_files:
        return pages, [f"No HTML files found under {SITE}"], external

    for page in html_files:
        source = page.read_text(encoding="utf-8")
        parser = PageParser()
        parser.feed(source)
        pages[page] = parser

        lowered = source.lower()
        for marker, reason in FORBIDDEN_PLACEHOLDERS.items():
            if marker in lowered:
                errors.append(f"{page.name}: contains {reason} ({marker!r})")

        if parser.main_count != 1:
            errors.append(f"{page.name}: expected one <main>, found {parser.main_count}")
        if parser.h1_count != 1:
            errors.append(f"{page.name}: expected one <h1>, found {parser.h1_count}")
        if not "".join(parser.title_text).strip():
            errors.append(f"{page.name}: missing non-empty <title>")

        duplicates = sorted({item for item in parser.ids if parser.ids.count(item) > 1})
        if duplicates:
            errors.append(f"{page.name}: duplicate ids: {', '.join(duplicates)}")

        local_nav = {
            urllib.parse.urlsplit(href).path
            for href in parser.hrefs
            if not urllib.parse.urlsplit(href).scheme
        }
        missing_nav = REQUIRED_NAV - local_nav
        if page.name != "index.html" and "index.html" not in local_nav:
            missing_nav.add("index.html")
        if missing_nav:
            errors.append(
                f"{page.name}: primary navigation missing {', '.join(sorted(missing_nav))}"
            )

        for asset in parser.assets:
            parts = urllib.parse.urlsplit(asset)
            if parts.scheme or asset.startswith("data:"):
                continue
            asset_path = (page.parent / parts.path).resolve()
            if not asset_path.is_file():
                errors.append(f"{page.name}: missing local asset {asset}")

        for href in parser.hrefs:
            if not href:
                errors.append(f"{page.name}: empty href")
                continue

            parts = urllib.parse.urlsplit(href)
            if parts.scheme:
                if parts.scheme != "https":
                    errors.append(f"{page.name}: non-HTTPS external link {href}")
                else:
                    external.add(href)
                continue

            target_path = parts.path or page.name
            target = (page.parent / target_path).resolve()
            if not target.is_file():
                errors.append(f"{page.name}: broken local target {href}")
                continue

            if parts.fragment and target.suffix == ".html":
                target_parser = pages.get(target)
                if target_parser is None:
                    target_source = target.read_text(encoding="utf-8")
                    target_parser = PageParser()
                    target_parser.feed(target_source)
                if parts.fragment not in target_parser.ids:
                    errors.append(
                        f"{page.name}: missing anchor #{parts.fragment} in {target.name}"
                    )

    return pages, errors, external


RELEASE_TAG_RE = re.compile(
    r"^https://github\.com/([^/]+)/([^/]+)/releases/tag/([^/?#]+)$"
)


def check_external(url: str) -> tuple[str, str | None]:
    request = urllib.request.Request(
        url,
        method="HEAD",
        headers={"User-Agent": "HolowanLinkVerifier/1.0"},
    )
    try:
        with urllib.request.urlopen(request, timeout=15) as response:
            status = response.status
    except urllib.error.HTTPError as error:
        if error.code in {401, 403, 405, 429}:
            return url, None
        return url, f"HTTP {error.code}"
    except (urllib.error.URLError, TimeoutError) as error:
        return url, str(error.reason if isinstance(error, urllib.error.URLError) else error)

    return (url, None) if status < 400 else (url, f"HTTP {status}")


def check_release_assets(url: str) -> tuple[str, str | None]:
    """GitHub release tag pages must expose at least one binary asset."""
    match = RELEASE_TAG_RE.match(url)
    if not match:
        return url, None

    owner, repo, tag = match.groups()
    api = f"https://api.github.com/repos/{owner}/{repo}/releases/tags/{tag}"
    request = urllib.request.Request(
        api,
        headers={
            "User-Agent": "HolowanLinkVerifier/1.0",
            "Accept": "application/vnd.github+json",
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            payload = response.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as error:
        return url, f"release API HTTP {error.code}"
    except (urllib.error.URLError, TimeoutError) as error:
        return url, str(error.reason if isinstance(error, urllib.error.URLError) else error)

    try:
        import json

        data = json.loads(payload)
    except json.JSONDecodeError:
        return url, "release API returned non-JSON"

    assets = data.get("assets") or []
    if not assets:
        return url, "release tag has zero assets (empty download)"
    return url, None


def main() -> int:
    argument_parser = argparse.ArgumentParser()
    argument_parser.add_argument(
        "--check-external",
        action="store_true",
        help="perform network checks for unique HTTPS links",
    )
    argument_parser.add_argument(
        "--check-release-assets",
        action="store_true",
        help="fail if any linked GitHub release/tag has zero binary assets",
    )
    args = argument_parser.parse_args()

    pages, errors, external = parse_pages()

    if args.check_external and external:
        with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
            for url, failure in executor.map(check_external, sorted(external)):
                if failure:
                    errors.append(f"external link failed: {url} ({failure})")

    if args.check_release_assets:
        release_urls = sorted(url for url in external if RELEASE_TAG_RE.match(url))
        with concurrent.futures.ThreadPoolExecutor(max_workers=6) as executor:
            for url, failure in executor.map(check_release_assets, release_urls):
                if failure:
                    errors.append(f"empty/broken release: {url} ({failure})")

    if errors:
        print("SITE VERIFICATION FAILED", file=sys.stderr)
        for error in errors:
            print(f" - {error}", file=sys.stderr)
        return 1

    parts = ["local"]
    if args.check_external:
        parts.append("external")
    if args.check_release_assets:
        parts.append("release-assets")
    print(
        f"SITE VERIFICATION PASSED: {len(pages)} pages, "
        f"{len(external)} unique HTTPS links ({' + '.join(parts)})"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
