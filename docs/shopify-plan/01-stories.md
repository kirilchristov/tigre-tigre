# Stories

## STORY-001 Frontend Checkout Entry

- [ ] Replace Stripe-based CTA destinations with Shopify checkout permalinks.
- [ ] Centralize Shopify storefront and variant configuration.
- [ ] Generate checkout URLs from bundle selection plus quantity.
- [ ] Preserve a safe fallback when Shopify variant IDs are missing.

## STORY-002 Quantity Selector UX

- [ ] Add a reusable `+ / -` quantity selector component.
- [ ] Wire quantity state into both purchase cards.
- [ ] Show visual quantity context and estimated totals without locking final pricing logic.
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

- [ ] Document payment, checkout, shipping, and branding settings to review manually.
- [ ] Document theme editing steps for settings, CSS, JS, and preview/publish flow.
- [ ] Document rollback steps for each manual Shopify change type.
- [ ] Document manual QA after each Shopify-side change.
