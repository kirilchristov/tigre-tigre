# TT-001: Replace buy CTA with waitlist email form

- Type: feature
- Story: STORY-002
- Status: In Review

## Goal
Replace purchase actions with an embedded waitlist email capture experience when sold-out mode is active.

## Implementation Plan
1. Add a dedicated embedded waitlist component for sold-out mode.
2. Render embedded Tally form inline (no redirect) with localized title/description.
3. Configure form source via environment variable so form URL can be changed without code edits.

## Definition of Done
- [x] Buy CTA buttons are not rendered in sold-out mode.
- [x] Waitlist block supports BG and EN labels/messages.
- [x] Embedded form is shown inline in sold-out mode (no redirect flow).
- [ ] Production Tally embed URL is configured and verified end-to-end.

## Validation
- [x] Add/update env coverage for waitlist embed configuration.
- [ ] Verify Tally submission path manually with a valid and invalid email in both locales.
- [x] `npm run build` passes.

## Progress Notes
- Completed: Added `WaitlistEmbed` component and wired it into sold-out CTA slot in `App.tsx`.
- Completed: Added `VITE_WAITLIST_TALLY_EMBED_URL` env support and BG/EN waitlist copy.
- Pending: Set real Tally form URL in runtime env and validate real submissions.
