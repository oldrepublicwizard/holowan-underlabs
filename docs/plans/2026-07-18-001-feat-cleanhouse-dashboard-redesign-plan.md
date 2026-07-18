---
title: "feat: Cleanhouse dense terminal portal redesign"
status: completed
date: 2026-07-18
---

# feat: Cleanhouse dense terminal portal redesign

## Summary

Rebuild Holowan Underlabs as a dense phosphor command-center matching the terminal mockup, with Holowan-owned product names, silent outbound play host, and banned-token CI — no prompt leakage.

## Problem Frame

The live site and docs were sparse, placeholder-shaped, and named upstream engines/orgs. That made the agent brief visible in the product.

## Requirements

- Dense rail + featured card home matching mockup structure (no fake telemetry)
- Holowan public names only; banned brands scrubbed from site + README + ORG
- Launch remains outbound Holowan play host under Holowan labels
- STRATEGY.md / DESIGN.md / AGENTS.md grounding for future agents

## Key Technical Decisions

- Static HTML/CSS/JS retained (no framework)
- Banned-token lint in verify + smoke + Pages workflow
- Desktop engine downloads omitted from public surface (URLs would contain banned tokens)
- DESIGN.md lists banned tokens for humans/agents; verify excludes DESIGN.md from brand scan so the contract file can name them

## Implementation Units

### U1. Grounding docs
STRATEGY.md, DESIGN.md, AGENTS.md

### U2. Shell CSS
Dense deck/rail/hero-strip/project-card system in `site/css/terminal.css`

### U3. Pages + JS rewrite
All `site/*.html` + `site/js/site.js` cleanhouse copy

### U4. Verify / smoke / charter
`verify_site.py`, `smoke.sh`, pages.yml, README, ORG, solutions learning

## Verification

- `python3 scripts/verify_site.py` passes
- `./scripts/smoke.sh` passes
- No banned-token hits under `site/`, README, ORG
