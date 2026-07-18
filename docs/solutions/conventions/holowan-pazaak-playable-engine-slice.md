---
title: Holowan Pazaak playable engine slice
date: 2026-07-18
last_updated: 2026-07-18
category: conventions
module: holowan-pazaak
problem_type: convention
component: testing_framework
severity: medium
applies_when:
  - Proving Holowan Pazaak is playable beyond cleanhouse URL retargets
  - Writing headless engine tests or CI gates for HoloPazaak
tags:
  - pazaak
  - headless-tests
  - branding
  - ci
related_components:
  - tooling
  - documentation
---

# Holowan Pazaak playable engine slice

## Context

Cleanhouse URL retargets alone do not prove Holowan Pazaak is playable. CI referenced a missing `tests/` tree with `continue-on-error`, and installed unused `pykotor @ git+…th3w1zard1/pykotor-lib`. Early stand-only harnesses never finished a match.

## Guidance

1. Brand the Qt surface as Holowan (`QSettings("Holowan", …)`, display name “Holowan Pazaak”, help links to Underlabs + Discord).
2. Treat `is_game_over` as a **property**, not a method.
3. After both players stand, phase is `ROUND_END` — call `start_round()` when `can_continue_round()` is true.
4. Prefer a draw-then-stand policy for headless matches; stand-only can deadlock on score ties (no set awarded).
5. Make pytest a hard CI gate; do not soft-pass engine tests.

## Why This Matters

Without a completing headless match, “Holowan Pazaak” is packaging theater. Soft CI hid that gap. The round-continue gotcha is easy to rediscover every time someone scripts the engine.

## When to Apply

- Adding or changing `PazaakGame` turn/round resolution
- Touching HoloPazaak CI / `tests/`
- Claiming the playable product slice is done

## Examples

```python
while not game.is_game_over and steps < max_steps:
    if game.can_continue_round():
        game.start_round()
        continue
    cur = game.current_player
    if cur.score >= 18 or len(cur.board) >= 6:
        game.stand(cur)
    else:
        game.end_turn()
```

Shipped: [HoloPazaak PR #2](https://github.com/oldrepublicwizard/HoloPazaak/pull/2) (merged) — `tests/test_engine_playable.py`, Holowan branding, CI hard gate.

## Related

- `docs/solutions/conventions/holowan-pazaak-cleanhouse-urls.md`
- `docs/solutions/conventions/holowan-toolchain-cleanhouse-urls.md` (NickHugi binary truth for sibling tools)
