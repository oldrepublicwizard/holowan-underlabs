---
title: Pazaak World GitHub Pages live gate
date: 2026-07-18
last_updated: 2026-07-18
category: conventions
module: holowan-pazaak
problem_type: convention
component: tooling
severity: medium
applies_when:
  - Deploying or verifying Holowan Multiplayer Pazaak public SPA
tags:
  - pazaak-world
  - github-pages
  - deploy
---

# Pazaak World GitHub Pages live gate

## Context

After extracting `oldrepublicwizard/pazaak-world`, Pages deploy failed with 404 until the repo had Pages enabled (`build_type: workflow`). Portal CTAs still pointed at GitHub source only.

## Guidance

1. Enable Pages via API or Settings: `build_type=workflow` before expecting `actions/deploy-pages` to succeed.
2. Live URL: `https://oldrepublicwizard.github.io/pazaak-world/` (BASE `/pazaak-world/`).
3. Portal featured card primary CTA = Play (Pages); keep Source as secondary on projects/tools.
4. Probe the Pages URL in `scripts/smoke.sh`.

## Why This Matters

A green build job that uploads an artifact is not a live product until Pages is enabled and deploy completes.
