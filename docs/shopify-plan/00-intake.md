# Intake

## Goal

- [ ] Keep the current frontend as the main storefront.
- [ ] Use Shopify only for checkout, payments, and order records.
- [ ] Use BOX NOW Bulgaria for locker delivery in checkout.
- [ ] Support bundle choice plus quantity selection in the frontend.
- [ ] Keep the model extensible for future merchandise.

## Confirmed Constraints

- [ ] Shopify baseline is non-Plus (`Grow` with CCS currently enabled).
- [ ] BOX NOW app is already installed and configured.
- [ ] Apple Pay, Google Pay, and card should appear in checkout only.
- [ ] The main frontend flow should skip the visible cart step when possible.
- [ ] Shopify-hosted checkout should be reduced to the bare minimum allowed by plan capabilities.

## Desired Outcomes

- [ ] Frontend CTA flow uses Shopify cart permalinks instead of Stripe payment links.
- [ ] Frontend includes a reusable quantity selector component.
- [ ] Repo contains a maintainable purchase-config layer for Shopify variants and checkout URLs.
- [ ] Repo contains operator runbooks for manual Shopify changes.
- [ ] Execution is tracked in small approved tasks.
