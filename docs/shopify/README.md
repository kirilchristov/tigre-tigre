# Shopify Knowledge Base

This folder is the project memory for Shopify setup, theme work, and checkout behavior.

## Current Documents

- [Pricing fixtures](./pricing-fixtures.md): bundle pricing, metafields, automatic discounts, Dawn theme display logic, and QA criteria.
- [Local theme setup](./local-theme-setup.md): step-by-step workflow for pulling the Shopify theme and previewing changes locally.

## Working Rules

- Do not commit Shopify Admin credentials, Theme Access tokens, private app tokens, API keys, or customer data.
- Prefer Shopify CLI browser login for local theme work.
- If a token is needed, keep it in the local shell session, macOS keychain, Shopify CLI auth store, or an ignored env file.
- Keep `.env.local` and other local env files out of git.
- Document decisions and runbooks here, but redact secrets and private identifiers that are not needed for development.

## Current Shopify Direction

- Bundle product-page savings are visual only and should be driven by product metafields.
- Real savings must be Shopify automatic discounts so cart and checkout can account for them.
- Bundle products must not combine Shopify compare-at pricing with an automatic bundle discount.
- Theme changes should be tested through a Shopify development theme before being pushed or published.
