---
title: Holowan Toolchain cleanhouse URLs
date: 2026-07-18
last_updated: 2026-07-18
category: conventions
module: holowan-toolchain
problem_type: convention
component: tooling
severity: high
applies_when:
  - Editing portal download cards or PyKotor/HoloPatcher packaging URLs
tags:
  - cleanhouse
  - naming
  - pykotor
  - holopatcher
  - nickhugi
---

# Holowan Toolchain cleanhouse URLs

## Context

PyKotor / HoloPatcher packaging still pointed at upstream orgs while Holowan portal cards open `oldrepublicwizard/*`.

## Guidance

**Split truth:**
- Metadata / source / issues → `oldrepublicwizard/PyKotor` (and tool repos)
- Binary release zips with assets → often still `NickHugi/PyKotor` tags (verify with `verify_site.py --check-release-assets`)

Do not retarget download URLs to Holowan unless those tags actually ship assets.

## Why This Matters

Retargeting empty Holowan tags breaks the integrity gate and ships dead download CTAs.

## When to Apply

Any change to `site/tools.html` release links or toolchain packaging About/update JSON.

## Related

HoloPazaak PR #1, HoloPatcher PR #1, PyKotor PR #2; sibling `holowan-holocron-cleanhouse-urls.md`.
