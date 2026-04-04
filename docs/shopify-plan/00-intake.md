# Intake

## Goal

- [x] Keep the current frontend as the main storefront.
- [ ] Use Shopify only for checkout, payments, and order records.
- [ ] Use BOX NOW Bulgaria for locker delivery in checkout.
- [x] Support bundle choice plus quantity selection in the frontend.
- [ ] Keep the model extensible for future merchandise.

## Confirmed Constraints

- [x] Shopify baseline is non-Plus (`Grow` with CCS currently enabled).
- [x] BOX NOW app is already installed and configured.
- [x] Apple Pay, Google Pay, and card should appear in checkout only.
- [x] The main frontend flow should skip the visible cart step when possible.
- [x] Shopify-hosted checkout should be reduced to the bare minimum allowed by plan capabilities.

## Desired Outcomes

- [x] Frontend CTA flow uses Shopify cart permalinks instead of Stripe payment links.
- [x] Frontend includes a reusable quantity selector component.
- [x] Repo contains a maintainable purchase-config layer for Shopify variants and checkout URLs.
- [x] Repo contains operator runbooks for manual Shopify changes.
- [x] Execution is tracked in small approved tasks.
