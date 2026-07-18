# Holowan Underlabs — project charter

Dense terminal home for **browser KotOR play** and the Holowan Underground tooling network.

**Canonical brand:** Holowan Underlabs / Holowan Underground  
**Repo:** https://github.com/oldrepublicwizard/holowan-underlabs  
**Live site:** https://oldrepublicwizard.github.io/holowan-underlabs/  
**Maintainer:** [@oldrepublicwizard](https://github.com/oldrepublicwizard)

The portal stays on the personal GitHub account — no org transfer planned.

## Mission

1. Let people **play KotOR / TSL in the browser** with a **legal PC install** (BYO data; no asset CDN).
2. Point humans at Holowan tools, docs, and community systems — not placeholders or prompt leakage.
3. Keep legal posture loud: engines/tools only; Steam/GOG for buying the games.

## Owned surfaces

| Surface | Role | Where issues go |
|---------|------|-----------------|
| **holowan-underlabs** (this site) | Portal / legal / play funnel | [holowan-underlabs issues](https://github.com/oldrepublicwizard/holowan-underlabs/issues) |
| **Holowan Browser Runtime** | Browser play (outbound host) | Portal tracker + Discord |
| **Holowan Toolchain** | Libraries / patchers / toolset | [PyKotor issues](https://github.com/oldrepublicwizard/PyKotor/issues) (+ related repos) |
| **community-bots** | Discord suite | [community-bots issues](https://github.com/oldrepublicwizard/community-bots/issues) |
| **Holowan Multiplayer Pazaak** | Discord + browser multiplayer (Pazaak World) | [Play](https://oldrepublicwizard.github.io/pazaak-world/) · [pazaak-world issues](https://github.com/oldrepublicwizard/pazaak-world/issues) |

## Community

- Discord: https://discord.gg/FGegxdeDVV
- Maintainer: [@oldrepublicwizard](https://github.com/oldrepublicwizard)

## Deploy

1. Push to `main` on `oldrepublicwizard/holowan-underlabs`.
2. **Settings → Pages → Source: GitHub Actions** (keep the repo **public**).
3. Verify: `./scripts/check_pages_health.sh oldrepublicwizard/holowan-underlabs`

## Non-goals

- Hosting or mirroring retail game assets
- Shipping private proprietary research trees
- Treating the portal as a second game engine (play is Holowan Browser Runtime at the outbound host)
- Moving the portal to a separate GitHub organization
- Invented live telemetry or banned brand names on the public surface (see DESIGN.md)
