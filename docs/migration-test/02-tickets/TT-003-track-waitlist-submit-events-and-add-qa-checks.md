# TT-003: Track waitlist submit events and add QA checks

- Type: chore
- Story: STORY-002
- Status: Backlog

## Goal
Add observability and release checks for the sold-out waitlist flow so launch quality can be verified.

## Implementation Plan
1. Add analytics events for waitlist form interactions (view, submit success, submit failure).
2. Add/update QA checklist and test cases for sold-out mode and waitlist behavior.
3. Document rollout verification steps in migration changelog or release notes.

## Definition of Done
- [ ] Analytics events fire once with correct payload shape.
- [ ] QA checklist includes both locales and both sold-out flag states.
- [ ] Known failure paths are documented with expected user-facing behavior.
- [ ] Story acceptance criteria can be fully verified using documented steps.

## Validation
- [ ] Confirm analytics events in debug mode/local instrumentation output.
- [ ] Run manual regression on homepage navigation and CTA area.
- [ ] `npm run build` passes.
