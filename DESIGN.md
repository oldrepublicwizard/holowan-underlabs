# DESIGN.md — Holowan Underlabs portal

Agents and humans: read this before changing `site/`.

## Visual thesis

Dense phosphor terminal command-center: green-on-black monospace, grid chrome, left rail navigation, interactive project cards — atmosphere from structure and typography, not fake live stats.

## Content plan (home)

1. Brand bar + slogan + access line  
2. Left rail: nav (no invented node metrics)  
3. Hero strip + primary Play CTAs  
4. Six featured project cards (Holowan names)  
5. Tools / Specs / Community strips with real links only  
6. Footer legal line  

## Interaction

1. Rail link hover / current-page highlight  
2. Project card border brighten on hover  
3. Primary amber CTA flash on focus  

## Product names (public)

| Role | Public name |
|------|-------------|
| Browser play | Holowan Browser Runtime |
| Online pazaak | Holowan Multiplayer Pazaak |
| Editors / converters | Holowan Forge |
| Libraries / parsers | Holowan Toolchain |
| Format notes | Specs |
| Bugs / tasks | Tracker |

## Banned tokens (public surface)

Do **not** put these strings (any case) in `site/`, `README.md`, or `ORG.md`:

`kotor.js` · `kotorjs` · `kotor-js` · `reone` · `openkotor` · `borealis` · `kobaltblu` · `seedhartha`

Game titles (KotOR / TSL / Knights of the Old Republic) are fine.  
Outbound play host URLs that do not contain banned tokens are fine.  
Do not invent “users online”, build revs like `r5127`, or IRC feeds as live data.

## Cards

Project cards are the interaction surface (clickable destinations). Panels that are not destinations stay as plain sections.

## Verification

`python3 scripts/verify_site.py` must pass (includes banned-token lint).  
`./scripts/smoke.sh` must pass.  
Visual: dense rail + card grid, not a sparse single-column funnel.
