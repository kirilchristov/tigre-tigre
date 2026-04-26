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
- `VITE_META_PIXEL_ID` - Meta Pixel ID for Facebook/Instagram ad attribution
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

## Security Notes

- ⚠️ **Never commit `.env.local` or `.env` files**
- ✅ Only `VITE_` prefixed variables are exposed to the client
- ✅ Storefront domains and public variant IDs are safe to expose client-side
- ❌ Never place Shopify admin tokens or BOX NOW secrets in client code

## Validation

The app validates environment variables on startup in development mode. Check the console for warnings about missing variables.
