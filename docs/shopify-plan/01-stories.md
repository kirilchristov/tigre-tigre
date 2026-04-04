# Stories

## STORY-001 Frontend Checkout Entry

- [x] Replace Stripe-based CTA destinations with Shopify checkout permalinks.
- [x] Centralize Shopify storefront and variant configuration.
- [x] Generate checkout URLs from bundle selection plus quantity.
- [x] Preserve a safe fallback when Shopify variant IDs are missing.

## STORY-002 Quantity Selector UX

- [x] Add a reusable `+ / -` quantity selector component.
- [x] Wire quantity state into the purchase flow, with `Get 1` fixed at quantity `1` and `Get More` starting at `2`.
- [x] Show quantity context in the UI without locking final pricing logic.
- [ ] Keep the UI model extensible for future merchandise.

## STORY-003 Shopify Storefront Reduction

- [ ] Remove or hide accelerated checkout buttons on storefront/cart surfaces.
- [ ] Minimize Shopify theme clutter on any reachable storefront pages.
- [ ] Verify what can and cannot be changed on the current Shopify plan.
- [ ] Confirm whether checkout logo destination can be controlled.

## STORY-004 BOX NOW Checkout Flow

- [ ] Verify locker selection in checkout for the live store configuration.
- [ ] Verify whether CCS is required for BOX NOW in the current setup.
- [ ] Verify post-payment operational flow between Shopify and BOX NOW.
- [ ] Record any app limitations that would force custom API work later.

## STORY-005 Shopify Manual Operations

- [x] Document payment, checkout, shipping, and branding settings to review manually.
- [x] Document theme editing steps for settings, CSS, JS, and preview/publish flow.
- [x] Document rollback steps for each manual Shopify change type.
- [x] Document manual QA after each Shopify-side change.
