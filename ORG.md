# Holowan Underlabs — project charter

OpenMW-style home for **browser KotOR play** and the Holowan Underground tooling network.

**Canonical brand:** Holowan Underlabs / Holowan Underground  
**Repo:** https://github.com/oldrepublicwizard/holowan-underlabs  
**Live site:** https://oldrepublicwizard.github.io/holowan-underlabs/  
**Maintainer:** [@oldrepublicwizard](https://github.com/oldrepublicwizard)

The portal stays on the personal GitHub account — no org transfer planned.

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

## Deploy

1. Push to `main` on `oldrepublicwizard/holowan-underlabs`.
2. **Settings → Pages → Source: GitHub Actions** (keep the repo **public**).
3. Verify: `./scripts/check_pages_health.sh oldrepublicwizard/holowan-underlabs`

## Non-goals

- Hosting or mirroring retail game assets
- Shipping Borealis sources
- Treating the portal as a second game engine (play is KotOR.js at play.swkotor.net)
- Moving the portal to a separate GitHub organization
