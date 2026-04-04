# Shopify Runbooks

## 1. Settings Review Checklist

- [ ] Payments: confirm Shopify Payments is active and eligible wallets are enabled.
- [ ] Checkout: review customer contact method, address collection, and any branding options currently exposed.
- [ ] Shipping and delivery: confirm BOX NOW shipping method visibility and any carrier-service dependencies.
- [ ] Domains: confirm the storefront domain used for direct checkout links.
- [ ] Policies and branding: confirm logo, favicon, and any checkout/editor settings currently available.

## 2. Theme Editing Runbook

### Safe working method

- [ ] Duplicate the live theme before editing.
- [ ] Make changes in the unpublished duplicate first.
- [ ] Preview the duplicate theme on desktop and mobile before publishing.
- [ ] Keep a short change log for each publish.

### Theme settings

- [ ] Open `Online Store -> Themes`.
- [ ] Use `Customize` on the duplicate theme first.
- [ ] Check theme settings for cart behavior, dynamic checkout buttons, branding, and custom CSS fields.
- [ ] Record each changed setting before saving.

### Theme code edits

- [ ] Open `Online Store -> Themes -> Edit code`.
- [ ] Identify the cart template, drawer, product form, and any snippets rendering dynamic checkout buttons.
- [ ] Identify where custom CSS and custom JS can be added safely in the theme.
- [ ] Prefer the smallest targeted edit and avoid editing unrelated sections.

### Rollback

- [ ] Revert by restoring the duplicate theme or reverting code in the theme editor version history if available.
- [ ] If a publish causes regression, republish the last known-good theme immediately.

## 3. CSS Guidance

- [ ] Use theme-level custom CSS only for storefront surfaces, not as a substitute for hosted checkout customization.
- [ ] Prefer component-level selectors over broad global overrides.
- [ ] Keep brand typography, spacing, and button styling changes scoped to storefront templates/snippets.
- [ ] Record each selector change in the change log.

## 4. JavaScript Guidance

- [ ] Use theme JS only on storefront surfaces that Shopify themes control.
- [ ] Avoid custom JS that fights Shopify checkout behavior on hosted checkout.
- [ ] Keep custom JS focused on UI cleanup, tracking, or storefront interactions.
- [ ] Test every JS change with the cart, CTA links, and responsive layouts.

## 5. Hosted Checkout Limits To Verify

- [ ] Which branding controls are available on the current plan.
- [ ] Whether the checkout logo destination is configurable.
- [ ] Whether any non-Plus checkout editor options are exposed in this store.
- [ ] Which BOX NOW app UI elements render inside checkout and whether they are configurable.

## 6. Manual QA Checklist

- [ ] Frontend CTA lands in the expected Shopify checkout.
- [ ] No unwanted accelerated checkout button is visible on reachable cart/storefront surfaces.
- [ ] BOX NOW locker selection appears in checkout.
- [ ] Checkout payment methods appear as expected on supported devices.
- [ ] Theme changes preserve mobile layout and do not regress the storefront.
