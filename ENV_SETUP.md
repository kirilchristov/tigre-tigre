# Environment Variables Setup

This project uses environment variables for configuration, particularly for Stripe integration and other sensitive data.

## Quick Start

1. **Copy the example file:**

   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local` with your actual values:**
   ```bash
   # Get your Stripe keys from https://dashboard.stripe.com/apikeys
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key
   VITE_STRIPE_PAYMENT_LINK_URL=https://buy.stripe.com/test_your_link
   ```

## Environment Files

- **`.env.example`** - Template with all available variables (committed to git)
- **`.env.local`** - Your local development config (gitignored, never commit)
- **Production** - Set variables in Vercel dashboard

## Available Variables

### Required for Production

- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key (pk*live*_ or pk*test*_)
- `VITE_STRIPE_PAYMENT_LINK_URL` - Direct link to Stripe payment page

### Optional

- `VITE_GA_MEASUREMENT_ID` - Google Analytics tracking ID
- `VITE_CONTACT_EMAIL` - Contact email (defaults to hello@tigre-tigre.com)

## Stripe Setup

1. Create account at [stripe.com](https://stripe.com)
2. Get API keys from [Dashboard > Developers > API Keys](https://dashboard.stripe.com/apikeys)
3. Create payment link at [Dashboard > Payment Links](https://dashboard.stripe.com/payment-links)
4. Use **test mode** for development (keys start with `pk_test_`)
5. Switch to **live mode** for production (keys start with `pk_live_`)

## Vercel Deployment

Set environment variables in Vercel dashboard:

1. Go to your project settings
2. Navigate to **Settings > Environment Variables**
3. Add all required variables
4. Redeploy for changes to take effect

## Security Notes

- ⚠️ **Never commit `.env.local` or `.env` files**
- ✅ Only `VITE_` prefixed variables are exposed to the client
- ✅ Publishable keys (pk\_\*) are safe to use client-side
- ❌ Never use secret keys (sk\_\*) in client code

## Validation

The app validates environment variables on startup in development mode. Check the console for warnings about missing variables.
