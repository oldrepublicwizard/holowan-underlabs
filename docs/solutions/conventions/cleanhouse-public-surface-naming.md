---
title: Cleanhouse public surface naming and banned brand tokens
date: 2026-07-18
category: conventions
problem_type: convention
module: portal
component: site
tags:
  - cleanhouse
  - naming
  - anti-slop
  - brand-scrub
applies_when:
  - Editing site HTML CSS JS or user-facing README ORG
  - Agents fill empty product slots with prompt or upstream brand names
---

# Cleanhouse public surface naming and banned brand tokens

## Context

Agentic coding filled Holowan's static portal with upstream engine/org names and sparse "prompt-shaped" copy. The attached terminal-dashboard mockup was ignored in favor of a thin funnel that made the chat brief obvious in the product.

## Guidance

1. Use Holowan product names on the public surface (Browser Runtime, Forge, Toolchain, Pazaak, Specs, Tracker).
2. Never invent live telemetry (users online, fake build revs, IRC as live data).
3. Enforce banned tokens via `scripts/verify_site.py` and CI brand scrub: `kotor.js`, `kotorjs`, `reone`, `openkotor`, `borealis`, `kobaltblu`, `seedhartha`.
4. Keep `DESIGN.md` + `STRATEGY.md` as the agent contract so briefs do not become page copy.
5. Match dense phosphor command-center structure (rail + featured cards), not a sparse single-column stub.

## Why This Matters

Without a naming contract and CI lint, the next agent session reintroduces prompt leakage. The site then documents the chat instead of the product.

## When to Apply

Before any `site/` or README/ORG edit. Before claiming a design pass complete.

## Examples

**Before:** Projects page lists banned engine brands and archive orgs as the product identity.  
**After:** Projects page lists Holowan Browser Runtime / Toolchain / Pazaak with Holowan-owned destinations; outbound play host stays unlabeled by engine brand.
