# Holowan Underlabs — organization charter

OpenMW-style home for **browser KotOR play** and the Holowan Underground tooling network.

**Canonical brand:** Holowan Underlabs / Holowan Underground  
**Current portal (until org exists):** https://oldrepublicwizard.github.io/holowan-underlabs/  
**Target org:** https://github.com/Holowan-Underlabs *(create via GitHub web UI — API cannot create personal orgs)*  
**Target Pages (after transfer):** https://holowan-underlabs.github.io/holowan-underlabs/

## Mission

1. Let people **play KotOR / TSL in the browser** with a **legal PC install** (BYO data; no asset CDN).
2. Point humans at real engines, tools, docs, and community systems — not placeholders.
3. Keep legal posture loud: engines/tools only; Steam/GOG for buying the games.

## Owned vs affiliated

| Surface | Role | Where issues go |
|---------|------|-----------------|
| **holowan-underlabs** (this site) | Portal / legal / play funnel | [holowan-underlabs issues](https://github.com/oldrepublicwizard/holowan-underlabs/issues) |
| **KotOR.js** | Browser engine (play.swkotor.net) | [KobaltBlu/KotOR.js](https://github.com/KobaltBlu/KotOR.js/issues) |
| **reone** | Desktop engine | [seedhartha/reone](https://github.com/seedhartha/reone/issues) |
| **PyKotor / Holocron / HoloPatcher / ModSync** | Toolchain | [oldrepublicwizard/PyKotor](https://github.com/oldrepublicwizard/PyKotor/issues) (+ related repos) |
| **community-bots** | Discord: Trask Q&A, HK roles, Pazaak | [oldrepublicwizard/community-bots](https://github.com/oldrepublicwizard/community-bots/issues) |
| **HoloPazaak** | Pazaak product surface | [oldrepublicwizard/HoloPazaak](https://github.com/oldrepublicwizard/HoloPazaak/issues) |
| **KotORPublicDomain** | Format schemas / archives | Org repos |
| **OpenKotOR** | Legacy tools org (archive) | Org repos — not the play CTA |
| **Project Borealis** | Private proprietary reference | **Not distributed** — see `site/legal.html#borealis` |

## Community

- Discord: https://discord.gg/YC7wBqabxA
- Maintainer: [@oldrepublicwizard](https://github.com/oldrepublicwizard)

## Org transfer checklist (manual)

GitHub does not allow creating a user-owned organization through the REST API from this account. Do this in a browser:

1. Open https://github.com/account/organizations/new (or **Settings → Organizations → New organization**).
2. Create org **`Holowan-Underlabs`** (free plan is fine).
3. Invite `oldrepublicwizard` as owner if needed.
4. Transfer **`oldrepublicwizard/holowan-underlabs`** → **`Holowan-Underlabs/holowan-underlabs`**  
   (*Settings → General → Danger zone → Transfer ownership*).
5. Confirm **Pages → Source: GitHub Actions** still enabled on the new owner.
6. Wait for deploy; verify:
   - `https://holowan-underlabs.github.io/holowan-underlabs/` returns 200 for `css/terminal.css` and `play.html`
   - `./scripts/check_pages_health.sh Holowan-Underlabs/holowan-underlabs`
7. Update this repo’s `README.md` Live URL and `site/projects.html` “Live site” link to the org Pages URL.
8. Optional later: custom domain + absolute sitemap/canonicals (only after DNS works).

## Non-goals

- Hosting or mirroring retail game assets
- Shipping Borealis sources
- Treating the portal as a second game engine (play is KotOR.js at play.swkotor.net)
