# Migration Changelog

## 2026-03-08
- Added: `STORY-002` sold-out page story and tickets `TT-001` to `TT-003`.
- Changed: Added sold-out feature flag (`VITE_SOLD_OUT_MODE`) with homepage gating for `SubHeroTextRollerSection`, `BannerScrollerSection`, and `ContentsSection`.
- Changed: Header navigation hides the `content` anchor in sold-out mode.
- Changed: Hero product image now displays a prominent red `Sold Out` badge and CTA cards are hidden in sold-out mode.
- Changed: `TT-002` moved to `In Review`.
- Verified: `npm run test -- src/lib/__tests__/env.test.ts`, `npm run typecheck`, `npm run build`.
