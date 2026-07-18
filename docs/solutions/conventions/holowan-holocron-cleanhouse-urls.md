---
title: Holocron Toolset cleanhouse URLs
date: 2026-07-18
last_updated: 2026-07-18
category: conventions
module: holowan-toolchain
problem_type: convention
component: tooling
severity: medium
applies_when:
  - Editing HolocronToolset packaging About update JSON or portal Holocron links
tags:
  - cleanhouse
  - naming
  - holocron
  - nickhugi
---

# Holocron Toolset cleanhouse URLs

## Context

Writable home is `oldrepublicwizard/HolocronToolset`, not upstream-owned packaging.

## Guidance

**Split truth (same as HoloPatcher):**
- Packaging / About / update JSON / org domain → Holowan
- Toolset zip assets → `NickHugi/PyKotor` tags
- Kits → `NickHugi/ToolsetData`

## Why This Matters

Same binary-truth rule as the broader toolchain: Holowan labels ≠ Holowan-hosted zips until assets exist.

## Related

HolocronToolset PR #1; PyKotor submodule bump; `holowan-toolchain-cleanhouse-urls.md`.
