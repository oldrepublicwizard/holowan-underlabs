---
title: Holowan Multiplayer Pazaak owns pazaak-world
date: 2026-07-18
last_updated: 2026-07-18
category: conventions
module: holowan-pazaak
problem_type: convention
component: documentation
severity: high
applies_when:
  - Editing portal Pazaak cards or Holowan product naming for online tables
  - Choosing HoloPazaak vs pazaak-world as the public owning repo
tags:
  - pazaak
  - pazaak-world
  - multiplayer
  - cleanhouse
---

# Holowan Multiplayer Pazaak owns pazaak-world

## Context

HoloPazaak was a desktop Qt prototype. Real Discord + browser multiplayer lived inside community-bots as `pazaak-*`. Holowan needed a standalone owning repo without Trask coupling.

## Guidance

1. Public product name: **Holowan Multiplayer Pazaak**
2. Owning repo / app crumb: **Pazaak World** → `https://github.com/oldrepublicwizard/pazaak-world`
3. Do not link portal CTAs to `HoloPazaak`
4. Extract source was an upstream community-bots HEAD (newer than the ORW fork); public Holowan Underlabs site never names banned org tokens
5. Trask/HK stay in `community-bots`; Pazaak bot must not remount `/api/trask`

## Why This Matters

Portal cards that still point at HoloPazaak advertise the wrong product. Suite coupling would pull Trask into a card-game repo.

## Related

- `oldrepublicwizard/pazaak-world`
- Retired prototype: `oldrepublicwizard/HoloPazaak`
