# Holowan Underlabs

OpenMW-style static portal: **play KotOR in the browser** (KotOR.js + your legal install).

Brand: **Holowan Underlabs** / Holowan Underground. GitHub org target: [`Holowan-Underlabs`](https://github.com/Holowan-Underlabs).

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

**Org charter + transfer checklist:** [ORG.md](ORG.md)  
*(GitHub org `Holowan-Underlabs` must be created in the web UI — API cannot create it.)*

## Pages

| Path | Role |
|------|------|
| `index.html` | Play CTAs + buy |
| `play.html` | Launch + browser check → `play.swkotor.net` |
| `projects.html` | KotOR.js · reone · tools · bots · orgs · Borealis (archive / legal only) |
| `tools.html` | Real GitHub releases (`downloads.html` redirects here) |
| `specs.html` | Engine / format refs |
| `contact.html` | Discord + issue trackers |
| `legal.html` | Own-game FAQ + Borealis |
| `mirrors.html` | Redirect stub → `play.html` |

## Deploy (GitHub Pages)

1. Create the **Holowan-Underlabs** GitHub organization (web UI), then create repo `holowan-underlabs` (or `website`).
2. Push this tree (`site/` + `.github/workflows/pages.yml`).
3. **Settings → Pages → Source: GitHub Actions**.
4. Optional custom domain later (do not set canonicals until DNS resolves).

## Named projects

KotOR.js · reone · Borealis (reference only) · PyKotor · community-bots / HoloPazaak · KotORPublicDomain · OpenKotOR (archive org) · oldrepublicwizard · Holowan Underlabs
