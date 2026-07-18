---
title: Holowan Underlabs strategy
last_updated: 2026-07-18
---

# Strategy

## Target problem

People who legally own Knights of the Old Republic / TSL want a trustworthy place to **play in the browser**, find Holowan tools, and join the community — without a prompt-shaped portal that names every upstream experiment or invents fake status theater.

## Our approach

Keep a **Holowan-owned command-center portal** (dense phosphor UI, cleanhouse names, real links only), then invest outside Pages chrome: **play-host reachability** and **toolchain release integrity** so every public download and launch CTA stays honest.

## Who it's for

Legal PC owners who want browser play and Holowan tooling; Discord community members; contributors filing issues on Holowan repos.

## Key metrics

| Metric | Where it lives |
|--------|----------------|
| Play CTA / Forge / Launcher host reachable | `scripts/smoke.sh` + CI |
| Linked GitHub release tags have ≥1 binary asset | `verify_site.py --check-release-assets` + CI |
| Site verify green (nav, assets, banned tokens) | `scripts/verify_site.py` |
| Zero banned-brand hits in `site/` + README/ORG | CI brand scrub |

## Tracks

1. **Portal surface** — *done for now.* Dense dashboard, Holowan naming, static atmosphere, destination crumbs. No further chrome unless product truth changes.
2. **Play funnel** — *active.* Preflight + launch/Forge/Launcher host health; BYO legal install. Fail CI when the Holowan play host is unreachable.
3. **Toolchain surface** — *active.* Holowan Forge / Toolchain download links must point at release tags that still ship binaries (no empty tags).

## Not working on

- Fake telemetry (users online, fabricated build revs, IRC theater as live data)
- Naming banned upstream brands on the public surface
- Treating this static portal as a second game engine
- Agent chat widgets on GitHub Pages
- Moving the repo off `oldrepublicwizard/holowan-underlabs`
- More portal visual polish without a product truth change
