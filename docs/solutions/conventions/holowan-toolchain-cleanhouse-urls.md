---
title: Holowan Toolchain cleanhouse URLs
date: 2026-07-18
module: holowan-toolchain
tags: [cleanhouse, naming, pykotor, holopatcher]
problem_type: conventions
---

# Holowan Toolchain cleanhouse URLs

PyKotor / HoloPatcher packaging still pointed at OpenKotOR. Holowan portal cards open `oldrepublicwizard/*`.

**Split truth:**
- Metadata / source / issues → `oldrepublicwizard/PyKotor` (and tool repos)
- Binary release zips with assets → often still `NickHugi/PyKotor` tags (verify with `verify_site.py --check-release-assets`)

Do not retarget download URLs to Holowan unless those tags actually ship assets.

Related: HoloPazaak PR #1, HoloPatcher PR #1, PyKotor PR #2.
