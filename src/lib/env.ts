/**
 * Environment configuration
 * Safely access environment variables with type checking and defaults
 */

const DEFAULT_META_PIXEL_ID = '1883344772853949'

const toPositiveNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

export const env = {
  // Analytics
  analytics: {
    gaId: import.meta.env.VITE_GA_MEASUREMENT_ID,
    metaPixelId: import.meta.env.VITE_META_PIXEL_ID ?? DEFAULT_META_PIXEL_ID,
  },

  // Shopify Customer Privacy API handoff. Only the public Storefront access
  // token belongs here; never a Shopify admin/private token.
  consent: {
    storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    checkoutRootDomain: import.meta.env.VITE_SHOPIFY_CHECKOUT_ROOT_DOMAIN,
    storefrontRootDomain: import.meta.env.VITE_SHOPIFY_STOREFRONT_ROOT_DOMAIN,
    /** Optional: only load the Shopify consent bundle where the operator has validated it. */
    apiScriptUrl: import.meta.env.VITE_SHOPIFY_CONSENT_API_URL,
    syncTimeoutMs: toPositiveNumber(import.meta.env.VITE_SHOPIFY_CONSENT_TIMEOUT_MS, 1500),
  },
} as const
