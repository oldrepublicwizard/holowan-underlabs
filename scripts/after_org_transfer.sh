#!/usr/bin/env bash
# Run AFTER creating org Holowan-Underlabs and transferring this repo.
# Rewrites personal Pages URLs → org Pages URLs and verifies health.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OLD_OWNER="${OLD_OWNER:-oldrepublicwizard}"
NEW_OWNER="${NEW_OWNER:-Holowan-Underlabs}"
REPO_NAME="${REPO_NAME:-holowan-underlabs}"
OLD_REPO="${OLD_OWNER}/${REPO_NAME}"
NEW_REPO="${NEW_OWNER}/${REPO_NAME}"
OLD_PAGES="https://${OLD_OWNER}.github.io/${REPO_NAME}"
# Org Pages hosts are lowercase
NEW_PAGES="https://holowan-underlabs.github.io/${REPO_NAME}"

if ! command -v gh >/dev/null 2>&1; then
  echo "gh CLI required" >&2
  exit 1
fi

if ! gh api "repos/${NEW_REPO}" --jq .full_name >/dev/null 2>&1; then
  echo "FAIL: ${NEW_REPO} not found." >&2
  echo "Create the org in the web UI, transfer the repo, then re-run:" >&2
  echo "  ./scripts/after_org_transfer.sh" >&2
  echo "See ORG.md." >&2
  exit 1
fi

echo "Rewriting ${OLD_PAGES} → ${NEW_PAGES} in README + site…"
export ROOT OLD_PAGES NEW_PAGES OLD_REPO NEW_REPO
python3 - <<'PY'
import os
from pathlib import Path

root = Path(os.environ["ROOT"])
old = os.environ["OLD_PAGES"].rstrip("/")
new = os.environ["NEW_PAGES"].rstrip("/")
old_repo = os.environ["OLD_REPO"]
new_repo = os.environ["NEW_REPO"]

for rel in ("README.md", "ORG.md", "site/projects.html", "site/index.html"):
    path = root / rel
    if not path.is_file():
        continue
    text = path.read_text(encoding="utf-8")
    updated = text.replace(old + "/", new + "/").replace(old, new)
    updated = updated.replace(
        f"https://github.com/{old_repo}",
        f"https://github.com/{new_repo}",
    )
    if updated != text:
        path.write_text(updated, encoding="utf-8")
        print(f"  updated {rel}")
    else:
        print(f"  unchanged {rel}")
PY

chmod +x "${ROOT}/scripts/check_pages_health.sh"
"${ROOT}/scripts/check_pages_health.sh" "${NEW_REPO}"

gh api -X PATCH "repos/${NEW_REPO}" \
  -f homepage="${NEW_PAGES}/" \
  -f description="Holowan Underlabs — play KotOR in the browser (static portal)" \
  >/dev/null

echo "OK: point git remote at ${NEW_REPO} if needed:"
echo "  git remote set-url origin https://github.com/${NEW_REPO}.git"
echo "Commit the URL rewrites, push, confirm Pages deploy."
