# Environment Variables Setup

This project uses environment variables for configuration, particularly for Shopify checkout links and other sensitive data.

## Quick Start

1. **Copy the example file:**

   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local` with your actual values:**
   ```bash
   VITE_SHOPIFY_STOREFRONT_DOMAIN=shop.tigre-tigre.com
   VITE_SHOPIFY_VARIANT_ID=56986218955100
   ```

## Environment Files

- **`.env.example`** - Template with all available variables (committed to git)
- **`.env.local`** - Your local development config (gitignored, never commit)
- **Production** - Set variables in Vercel dashboard

## Available Variables

### Required for Production

- `VITE_SHOPIFY_STOREFRONT_DOMAIN` - Storefront domain used to build direct checkout links
- `VITE_SHOPIFY_VARIANT_ID` - Shopify variant ID used by both checkout entry points, with quantity controlling the difference

### Optional

- `VITE_GA_MEASUREMENT_ID` - Google Analytics tracking ID
- `VITE_CONTACT_EMAIL` - Contact email (defaults to hello@tigre-tigre.com)

## Shopify Setup

1. Find the storefront domain for checkout links, for example `shop.tigre-tigre.com`
2. Find the variant ID for each offer that should be purchasable from the frontend
3. Set the domain and variant IDs in `.env.local`
4. Test the generated checkout URLs locally before deploying

## Vercel Deployment

Set environment variables in Vercel dashboard:

1. Go to your project settings
2. Navigate to **Settings > Environment Variables**
3. Add all required variables
4. Redeploy for changes to take effect

## Security Notes

- ⚠️ **Never commit `.env.local` or `.env` files**
- ✅ Only `VITE_` prefixed variables are exposed to the client
- ✅ Storefront domains and public variant IDs are safe to expose client-side
- ❌ Never place Shopify admin tokens or BOX NOW secrets in client code

## Validation

The app validates environment variables on startup in development mode. Check the console for warnings about missing variables.
