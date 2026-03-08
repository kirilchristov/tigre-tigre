# TT-001: Replace buy CTA with waitlist email form

- Type: feature
- Story: STORY-002
- Status: Backlog

## Goal
Replace purchase actions with a waitlist email capture experience when sold-out mode is active.

## Implementation Plan
1. Add sold-out variant rendering inside `src/components/ProductCTA.tsx` (or a dedicated `WaitlistForm` child component).
2. Build form UX with email input, submit button, and validation (required + email format).
3. Submit email to configured waitlist endpoint and show loading/success/error states with localized copy.

## Definition of Done
- [ ] Buy CTA buttons are not rendered in sold-out mode.
- [ ] Waitlist form supports BG and EN labels/messages.
- [ ] Submit is blocked for invalid email and enabled for valid email.
- [ ] Successful and failed submissions both show clear user feedback.

## Validation
- [ ] Add/update component tests for sold-out rendering + email validation.
- [ ] Verify form submission path manually with a valid and invalid email in both locales.
- [ ] `npm run build` passes.
