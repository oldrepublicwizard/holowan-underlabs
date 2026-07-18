---
title: "chore: Play + toolchain integrity gates"
status: completed
date: 2026-07-18
---

# chore: Play + toolchain integrity gates

## Summary

Portal chrome is parked. Next investment is CI that fails when Holowan play hosts die or linked GitHub release tags ship zero assets.

## Requirements

- CI runs `verify_site.py --check-release-assets`
- Smoke probes Forge + Launcher hosts alongside game launch
- STRATEGY tracks reflect portal done / play+toolchain active

## Verification

- `python3 scripts/verify_site.py --check-release-assets`
- `./scripts/smoke.sh`
