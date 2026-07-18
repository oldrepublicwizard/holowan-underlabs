---
title: Holowan Pazaak cleanhouse URLs
date: 2026-07-18
last_updated: 2026-07-18
category: conventions
module: holowan-pazaak
problem_type: convention
component: documentation
severity: medium
applies_when:
  - Editing HoloPazaak README pyproject config or portal Pazaak cards
tags:
  - cleanhouse
  - naming
  - holopazaak
---

# Holowan Pazaak cleanhouse URLs

## Context

HoloPazaak metadata had been retargeted to an upstream org in README/`pyproject`/`config.py`, conflicting with Holowan public naming.

## Guidance

Point metadata at `oldrepublicwizard/HoloPazaak` (and Holowan Toolchain library at `oldrepublicwizard/PyKotor` when needed). Cleanhouse URLs alone do not prove playability — see `holowan-pazaak-playable-engine-slice.md`.

## Why This Matters

Portal cards and packaging must agree on Holowan ownership without inventing empty release hosts.

## Related

HoloPazaak `feat/cleanhouse-holowan-urls`; `holowan-pazaak-playable-engine-slice.md`.
