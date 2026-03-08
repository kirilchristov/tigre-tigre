# TT-002: Add sold-out state config and UI gating

- Type: feature
- Story: STORY-002
- Status: Backlog

## Goal
Introduce a single sold-out state switch and gate homepage sections/entry points based on that state.

## Implementation Plan
1. Extend `src/lib/env.ts` with sold-out configuration values (for example `VITE_SOLD_OUT_MODE` and waitlist target settings).
2. Update page composition in `src/App.tsx` to hide sold-out-excluded sections (`SubHeroTextRollerSection`, `BannerScrollerSection`, `ContentsSection`) when the flag is enabled.
3. Update navigation links/anchors so hidden sections are not linked in sold-out mode.

## Definition of Done
- [ ] Sold-out mode can be toggled via environment config.
- [ ] Hidden sections are not rendered in sold-out mode.
- [ ] Existing sections remain unchanged when sold-out mode is disabled.
- [ ] Header navigation does not include links to hidden sections in sold-out mode.

## Validation
- [ ] Add/update tests for sold-out config and gated rendering logic.
- [ ] Manual QA for both flag states (`sold out` and `not sold out`).
- [ ] `npm run build` passes.
