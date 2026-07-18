# Agent guide — Holowan Underlabs

Static GitHub Pages portal for Holowan Underlabs / Holowan Underground.

## Before you edit

1. Read [STRATEGY.md](STRATEGY.md) and [DESIGN.md](DESIGN.md).
2. Public copy uses **Holowan product names only**. Banned brand tokens are listed in DESIGN.md and enforced by `scripts/verify_site.py`.
3. Do not invent live telemetry or placeholder mirrors.

## Layout

- Site root: `site/`
- Styles: `site/css/terminal.css`
- Behavior: `site/js/site.js`
- Deploy: `.github/workflows/pages.yml`

## Verify

```bash
python3 scripts/verify_site.py
python3 scripts/verify_site.py --check-external --check-release-assets
./scripts/smoke.sh
./scripts/check_pages_health.sh
```

Portal chrome is parked (see STRATEGY tracks). Prefer play-host / release-asset integrity work over more visual polish.

## Docs

- `STRATEGY.md` — product anchor  
- `DESIGN.md` — visual + naming contract  
- `ORG.md` — charter (cleanhouse; no banned tokens)  
- `docs/solutions/` — documented learnings when present (search by `module` / `tags` / `problem_type`)
