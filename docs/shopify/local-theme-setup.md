# Local Shopify Theme Setup

Use this runbook to add the Shopify theme locally and test Dawn theme changes in real time.

## Current Local State

- Shopify CLI is installed locally.
- Current installed CLI version checked on 2026-06-26: `3.92.1`.
- Shopify CLI reported `3.93.0` as available, but upgrading is optional unless a command fails.
- This Vite storefront repo already builds Shopify cart permalinks in `src/lib/shopify.ts`.

## Recommended Directory

Keep the Shopify theme as a sibling workspace so the React/Vite storefront and the Liquid theme stay cleanly separated:

```bash
/Users/kirilchristov/CODE/tigre-tigre
/Users/kirilchristov/CODE/tigre-tigre-shopify-theme
```

If we later decide the theme should live inside this repo, add it deliberately and review git status before committing.

## Secret Handling

- Do not paste Shopify tokens into docs, chat, source files, or committed config.
- Use Shopify CLI's browser login when possible.
- If a Theme Access token is required, pass it through a local shell variable or ignored env file only.
- The store identifier can be documented, but private tokens cannot.

## Step-by-Step Setup

1. Confirm the Shopify store identifier.

   Use the store prefix or full `.myshopify.com` domain. Prefer the `.myshopify.com` domain over the public storefront domain.

   ```bash
   export SHOPIFY_STORE="994i4b-3m.myshopify.com"
   ```

2. Create the local theme workspace.

   ```bash
   mkdir -p /Users/kirilchristov/CODE/tigre-tigre-shopify-theme
   ```

3. Pull the current theme.

   Run this from anywhere. Shopify CLI will prompt for login and theme selection if needed.

   ```bash
   shopify theme pull \
     --store "$SHOPIFY_STORE" \
     --path /Users/kirilchristov/CODE/tigre-tigre-shopify-theme
   ```

   Select the Dawn theme or the theme currently used by the store. Pulling the theme only downloads files locally.

4. Start local theme development.

   ```bash
   shopify theme dev \
     --store "$SHOPIFY_STORE" \
     --path /Users/kirilchristov/CODE/tigre-tigre-shopify-theme \
     --port 9292
   ```

   Shopify CLI uploads the local files as a development theme and prints preview/editor URLs. Local CSS and section changes hot reload through the preview.

5. Make the bundle price changes.

   Edit these theme files in the theme workspace:

   ```text
   snippets/price.liquid
   assets/base.css
   ```

   Follow [pricing-fixtures.md](./pricing-fixtures.md). The important rule is that products with bundle metafields show only the bundle visual price, while all other products continue through Dawn's normal price blocks.

6. QA before pushing.

   Check:

   - Single jar shows normal price only.
   - 3-pack shows the crossed-out visual bundle display and no duplicate normal price.
   - 3-pack cart/checkout receives the real automatic discount.
   - Compare-at price remains empty for bundle products.
   - Free shipping still combines only if Shopify discount settings allow it.

7. Push only when ready.

   First push to an unpublished theme or development context. Do not publish directly until the preview passes QA.

   ```bash
   shopify theme push \
     --store "$SHOPIFY_STORE" \
     --path /Users/kirilchristov/CODE/tigre-tigre-shopify-theme \
     --unpublished
   ```

## Commands To Avoid Unless Intentional

- Avoid `shopify theme dev --allow-live`; local changes should not target the live theme during normal development.
- Avoid `shopify theme push --publish` until the exact theme has been reviewed.
- Avoid hardcoding `--password` tokens in shell history, scripts, or docs.

## References

- Shopify Theme docs via Context7 on 2026-06-26: `shopify theme pull --store <store>` downloads theme code, and `shopify theme dev --store <store>` creates a development theme with hot reload and preview URLs.
- Shopify CLI docs via Context7 on 2026-06-26: `theme dev` supports `--store`, `--path`, `--port`, `--theme`, `--open`, and live-reload controls; `theme pull` supports `--store`, `--path`, `--theme`, `--live`, `--development`, `--only`, `--ignore`, and `--nodelete`.
