---
title: Holowan Underlabs strategy
last_updated: 2026-07-18
---

# Strategy

## Target problem

People who legally own Knights of the Old Republic / TSL want a trustworthy place to **play in the browser**, find Holowan tools, and join the community — without a prompt-shaped portal that names every upstream experiment or invents fake status theater.

## Our approach

Ship a **Holowan-owned command-center portal**: dense phosphor terminal aesthetic, Holowan product names only on the public surface, real outbound play host under Holowan labels, real tool downloads, no invented metrics, no banned brand leakage in site or user-facing docs.

## Who it's for

Legal PC owners who want browser play and Holowan tooling; Discord community members; contributors filing issues on Holowan repos.

## Key metrics

| Metric | Where it lives |
|--------|----------------|
| Play CTA click → outbound host reachable | `scripts/smoke.sh` + Pages health |
| Site verify green (nav, assets, banned tokens) | `scripts/verify_site.py` |
| Zero banned-brand hits in `site/` + README/ORG | CI brand scrub |

## Tracks

1. **Portal surface** — dense dashboard IA matching the Holowan terminal mockup; cleanhouse naming.
2. **Play funnel** — browser preflight + launch to the Holowan play host; BYO legal install.
3. **Toolchain surface** — Holowan Forge / Toolchain downloads with real release assets.

## Not working on

- Fake telemetry (users online, fabricated build revs, IRC theater as live data)
- Naming banned upstream brands on the public surface
- Treating this static portal as a second game engine
- Agent chat widgets on GitHub Pages
- Moving the repo off `oldrepublicwizard/holowan-underlabs`
