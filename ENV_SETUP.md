# Environment Variables Setup

This project uses environment variables for configuration, particularly for Shopify checkout links and other sensitive data.

## Quick Start

1. **Copy the example file:**

   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local` with your actual values:**
   ```bash
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   VITE_SOLD_OUT_MODE=false
   VITE_STAGING=false
   ```

## Environment Files

- **`.env.example`** - Template with all available variables (committed to git)
- **`.env.local`** - Your local development config (gitignored, never commit)
- **Production** - Set variables in Vercel dashboard

## Available Variables

### Required for Production

- `VITE_GA_MEASUREMENT_ID` - Google Analytics tracking ID
- `VITE_META_PIXEL_ID` - Meta Pixel ID for Facebook/Instagram ad attribution (production: `1883344772853949`). This build-time setting overrides the code default; update any existing Vercel Production value before redeploying.
- `VITE_SOLD_OUT_MODE` - Enables sold-out mode in the frontend
- `VITE_STAGING` - Marks a deployment as staging/preview

## Shopify Setup

1. Keep the shared Shopify storefront domain and variant ID in the frontend purchase config
2. Test the generated checkout URLs locally before deploying

## Vercel Deployment

Set environment variables in Vercel dashboard:

1. Go to your project settings
2. Navigate to **Settings > Environment Variables**
3. Add all required variables
4. Redeploy for changes to take effect


## Cookie consent and Shopify Customer Privacy

The React banner stores the visitor's choice locally and attempts to register it
with Shopify through the supported Customer Privacy API. Values below are public
by design; never put a Shopify Admin API token or shared secret in a `VITE_`
variable.

- `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN` - public Storefront API token passed as
  `storefrontAccessToken` for Shopify's documented custom-storefront
  `setTrackingConsent` call. **The store owner must supply this.** Without it,
  the site still collects the local choice and relies on Shopify's checkout
  cookie banner as the enforcement fallback.
- `VITE_SHOPIFY_CHECKOUT_ROOT_DOMAIN` - checkout root domain (for example the
  shop's primary domain root).
- `VITE_SHOPIFY_STOREFRONT_ROOT_DOMAIN` - storefront root domain.
- `VITE_SHOPIFY_CONSENT_API_URL` - optional, opt-in URL of Shopify's consent
  bundle. Leave empty: the React app runs on the Vercel origin, where Shopify
  does not inject the API, and Shopify documents Hydrogen analytics as the
  supported custom-storefront installation.
- `VITE_SHOPIFY_CONSENT_TIMEOUT_MS` - bounded callback wait (default 1500 ms).

See `reports` note in the workspace: the checkout-side banner must also be
enabled in Shopify admin (Settings > Customer privacy > Cookie banner > "Show
cookie banner in checkout"), because a cart permalink opens the Shopify origin
directly and cannot inherit this page's JavaScript context.

## Security Notes

- ⚠️ **Never commit `.env.local` or `.env` files**
- ✅ Only `VITE_` prefixed variables are exposed to the client
- ✅ Storefront domains and public variant IDs are safe to expose client-side
- ❌ Never place Shopify admin tokens or BOX NOW secrets in client code

## Validation

The app validates environment variables on startup in development mode. Check the console for warnings about missing variables.
