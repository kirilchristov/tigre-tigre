# Migration Changelog

## 2026-03-08
- Added: `STORY-002` sold-out page story and tickets `TT-001` to `TT-003`.
- Changed: Added sold-out feature flag (`VITE_SOLD_OUT_MODE`) with homepage gating for `SubHeroTextRollerSection`, `BannerScrollerSection`, and `ContentsSection`.
- Changed: Header navigation hides the `content` anchor in sold-out mode.
- Changed: Hero product image now displays a prominent red `Sold Out` badge and CTA cards are hidden in sold-out mode.
- Changed: `TT-002` moved to `In Review`.
- Verified: `npm run test -- src/lib/__tests__/env.test.ts`, `npm run typecheck`, `npm run build`.
- Changed: Merged sold-out implementation into `preview` (`13655f0`, merge `82e93bf`) and reviewed ticket alignment.
- Changed: `TT-002` moved to `In Progress` after review because section/nav gating items are still pending.
- Verified: `TT-002` partial completion confirmed (`env` flag + hero overlay done; section/nav gating still open).
- Changed: Scope decision update: sold-out phase is CTA-only; homepage section hiding and nav pruning are explicitly deferred.
- Changed: Story + `TT-002` acceptance criteria were updated to match CTA-only scope.
- Changed: `TT-002` moved to `In Review` under CTA-only scope.
- Changed: `TT-002` marked `Done` after confirming implemented scope (sold-out flag, CTA suppression, hero sold-out indicator).
