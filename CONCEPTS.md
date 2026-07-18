# Concepts

Shared domain vocabulary for this project — entities, named processes, and status concepts with project-specific meaning. Seeded with core domain vocabulary, then accretes as ce-compound and ce-compound-refresh process learnings; direct edits are fine. Glossary only, not a spec or catch-all.

## Portal

**Holowan Underlabs** — Public brand for the static command-center portal (also **Holowan Underground**). Pages site under `oldrepublicwizard/holowan-underlabs`.

**Cleanhouse** — Public-surface naming contract: Holowan product names only, banned upstream brand tokens scrubbed by verify/CI, no fake telemetry.

**Portal chrome** — Visual/layout work on the static Pages site. STRATEGY marks this track *parked* unless product truth changes.

## Tracks

**Play funnel** — Active track: browser play CTA, preflight, and outbound host health (Play / Forge host / Launcher) for legal owners launching on the Holowan-labeled play host.

**Toolchain surface** — Active track: honest download CTAs for Holowan-labeled tools; release tags must ship ≥1 binary asset.

## Binary truth

**NickHugi split** — Holowan owns metadata/source/issues on `oldrepublicwizard/*`; many public zip assets still live on `NickHugi/*` tags. Do not retarget downloads to Holowan tags that ship zero assets.

## Integrity gates

**Site verify** — `scripts/verify_site.py` (nav, assets, banned tokens; optional `--check-external` / `--check-release-assets`) plus smoke/CI — the honesty bar for shipping portal changes.

## Multiplayer Pazaak

**Holowan Multiplayer Pazaak** — Public product name for Discord + browser multiplayer tables.

**Pazaak World** — Owning app/repo (`oldrepublicwizard/pazaak-world`). Supersedes the HoloPazaak desktop prototype for portal CTAs.
