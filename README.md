# Holowan Underlabs

Dense phosphor terminal portal: **play KotOR in the browser** (Holowan Browser Runtime + your legal install).

Brand: **Holowan Underlabs** / Holowan Underground  
Repo: [`oldrepublicwizard/holowan-underlabs`](https://github.com/oldrepublicwizard/holowan-underlabs)

Read [STRATEGY.md](STRATEGY.md) and [DESIGN.md](DESIGN.md) before changing the site.

## Preview

```bash
python3 -m http.server 8471 --bind 127.0.0.1 --directory site
# http://127.0.0.1:8471/
python3 scripts/verify_site.py
python3 scripts/verify_site.py --check-external --check-release-assets
./scripts/smoke.sh
./scripts/check_pages_health.sh
```

Live: https://oldrepublicwizard.github.io/holowan-underlabs/

**Charter:** [ORG.md](ORG.md)

## Pages

| Path | Role |
|------|------|
| `index.html` | Command-center home + featured cards + buy |
| `play.html` | Launch + browser check → Holowan play host |
| `projects.html` | Holowan Browser Runtime · Forge · Toolchain · Pazaak |
| `tools.html` | Real GitHub releases (`downloads.html` redirects here) |
| `specs.html` | Format / toolchain refs |
| `contact.html` | Discord + issue trackers |
| `legal.html` | Own-game FAQ |
| `mirrors.html` | Redirect stub → `play.html` |

## Deploy (GitHub Pages)

1. Push this tree (`site/` + `.github/workflows/pages.yml`) to `main`.
2. Keep the repo **public**; **Settings → Pages → Source: GitHub Actions**.
3. Optional custom domain later (do not set canonicals until DNS resolves).

## Named Holowan surfaces

Holowan Browser Runtime · Holowan Forge · Holowan Toolchain · Holowan Multiplayer Pazaak · Specs · Tracker
