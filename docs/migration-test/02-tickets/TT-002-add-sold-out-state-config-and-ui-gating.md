# TT-002: Add sold-out state config and UI gating

- Type: feature
- Story: STORY-002
- Status: In Review

## Goal
Introduce a single sold-out state switch and gate CTA surfaces based on that state.

## Implementation Plan
1. Extend `src/lib/env.ts` with sold-out configuration values (for example `VITE_SOLD_OUT_MODE`).
2. Update CTA composition so buy surfaces are removed/suppressed in sold-out mode.
3. Show a prominent sold-out indicator in the hero area when sold-out mode is enabled.

## Definition of Done
- [ ] Sold-out mode can be toggled via environment config.
- [ ] Buy CTAs are not rendered in sold-out mode.
- [ ] Hero sold-out indicator is visible in sold-out mode.
- [ ] Non-CTA sections remain visible in sold-out mode for this phase.
- [ ] Existing non-sold-out behavior remains unchanged when the flag is disabled.

## Validation
- [ ] Add/update tests for sold-out config and CTA gating logic.
- [ ] Manual QA for both flag states (`sold out` and `not sold out`).
- [ ] `npm run build` passes.

## Progress Notes
- Completed: `VITE_SOLD_OUT_MODE` flag added and parsed in `env`.
- Completed: Hero area shows a large `Sold Out` overlay and buy CTA footer is suppressed when sold out.
- Decision: Section hiding and nav pruning are out of scope for this phase.
