# STORY-002: Sold out page with waitlist email capture

## Problem
When inventory is unavailable, the homepage still displays buy CTAs and full shopping-oriented content.
Users can click through to checkout links even though they cannot purchase, which creates friction and drops intent.

## User Value
Shoppers get a clear sold-out message, can quickly leave their email for restock updates, and avoid dead-end purchase flows.

## Scope
- Add a sold-out state flag that controls homepage behavior.
- Hide purchase actions when sold out.
- Replace buy CTAs with an email capture form for restock notifications.
- Provide localized success/error feedback after form submission.
- Keep non-CTA homepage sections visible in sold-out mode for this phase.

## Acceptance Criteria
- [ ] A single sold-out configuration switch can enable/disable sold-out mode without code changes.
- [ ] In sold-out mode, `ProductCTA` no longer shows checkout buttons or links to Stripe.
- [ ] In sold-out mode, non-CTA sections remain visible and continue to function.
- [ ] In sold-out mode, users can submit a valid email via a waitlist form and see loading/success/error states.
- [ ] In normal mode, current buy flow and currently visible sections behave exactly as before (no regression).

## Dependencies
- Waitlist destination endpoint/provider and required payload format.
- Final copy (BG/EN) for sold-out message, input placeholder, and form states.
- Analytics event naming for waitlist interactions.

## Technical Notes
- Extend `src/lib/env.ts` with explicit sold-out configuration and waitlist endpoint values.
- Keep sold-out CTA gating logic centralized in top-level composition (`src/App.tsx`) and CTA surfaces.
- Keep form component isolated so it can later be reused on other pages.

## Split Into Tickets
- [ ] `TT-002` Add sold-out state config and UI gating
- [ ] `TT-001` Replace buy CTA with waitlist email form
- [ ] `TT-003` Track waitlist submit events and add QA checks
