---
title: Holowan Underlabs strategy
last_updated: 2026-07-18
---

# Strategy

## Target problem

People who legally own Knights of the Old Republic / TSL want a trustworthy place to **play in the browser**, find Holowan tools, and join the community — without a prompt-shaped portal that names every upstream experiment or invents fake status theater.

## Our approach

Keep a **Holowan-owned command-center portal** (dense phosphor UI, cleanhouse names, real links only), then invest outside Pages chrome: **outbound host reachability** (Play CTA, Forge host, Launcher) and **toolchain release integrity** so every public download and launch CTA stays honest. Online multiplayer cards live at **Holowan Multiplayer Pazaak** / [`oldrepublicwizard/pazaak-world`](https://github.com/oldrepublicwizard/pazaak-world) with live play at [oldrepublicwizard.github.io/pazaak-world](https://oldrepublicwizard.github.io/pazaak-world/) (not the retired HoloPazaak desktop prototype).

## Who it's for

Legal PC owners who want browser play and Holowan tooling; Discord community members; contributors filing issues on Holowan repos.

## Key metrics

| Metric | Where it lives |
|--------|----------------|
| Play CTA / Forge host / Launcher host reachable | `verify_site.py --check-external` + CI (local: `scripts/smoke.sh`) |
| Linked GitHub release tags have ≥1 binary asset | `verify_site.py --check-release-assets` + CI |
| Site verify green (nav, assets, banned tokens) | `scripts/verify_site.py` |
| Zero banned-brand hits in `site/` + README/ORG | CI brand scrub |

## Tracks

1. **Portal surface** — *parked / done for now.* Dense dashboard, Holowan naming, static atmosphere, destination crumbs. No further chrome unless product truth changes (CTA retargets for owning-repo moves are allowed).
2. **Play funnel** — *active.* Preflight + outbound host health (Play CTA, Forge host, Launcher host); BYO legal install. Fail CI when any of those hosts are unreachable.
3. **Toolchain surface** — *active.* Holowan-labeled Toolchain (and related) download links must point at release tags that still ship binaries (no empty tags). Holowan owns metadata/source; binary zip URLs may remain on `NickHugi/*` (or other) tags that actually ship assets — do not retarget to Holowan tags that are empty.
4. **Multiplayer Pazaak** — *active product surface.* Owning repo `oldrepublicwizard/pazaak-world`; live SPA `https://oldrepublicwizard.github.io/pazaak-world/`; portal cards must not advertise HoloPazaak.

## Not working on

- Fake telemetry (users online, fabricated build revs, IRC theater as live data)
- Naming banned upstream brands on the public surface
- Treating this static portal as a second game engine
- Agent chat widgets on GitHub Pages
- Moving the repo off `oldrepublicwizard/holowan-underlabs`
- More portal visual polish without a product truth change
