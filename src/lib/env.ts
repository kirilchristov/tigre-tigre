/**
 * Environment configuration
 * Safely access environment variables with type checking and defaults
 */

function parseBooleanFlag(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase()
    return normalized === 'true' || normalized === '1'
  }

  return false
}

function parseEnvString(value: unknown): string {
  if (typeof value !== 'string') {
    return ''
  }

  const normalized = value.trim()

  if (!normalized || normalized.toLowerCase() === 'undefined' || normalized.toLowerCase() === 'null') {
    return ''
  }

  return normalized
}

export const env = {
  // Shopify
  shopify: {
    storefrontDomain:
      parseEnvString(import.meta.env.VITE_SHOPIFY_STOREFRONT_DOMAIN) || 'shop.tigre-tigre.com',
    variantId: parseEnvString(import.meta.env.VITE_SHOPIFY_VARIANT_ID),
  },

  // Analytics
  analytics: {
    gaId: import.meta.env.VITE_GA_MEASUREMENT_ID,
  },

  // Contact
  contact: {
    email: parseEnvString(import.meta.env.VITE_CONTACT_EMAIL) || 'hello@tigre-tigre.com',
  },

  // Feature flags
  soldOut: {
    enabled: parseBooleanFlag(import.meta.env.VITE_SOLD_OUT_MODE),
  },

  // Environment checks
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const

/**
 * Validate that all required environment variables are set
 * Call this during app initialization in development
 */
export function validateEnv() {
  if (import.meta.env.DEV) {
    const warnings: string[] = []

    if (!env.shopify.variantId) {
      warnings.push('VITE_SHOPIFY_VARIANT_ID is not set')
    }

    if (warnings.length > 0) {
      console.warn(
        '⚠️ Missing environment variables:\n' +
          warnings.map((w) => `  - ${w}`).join('\n') +
          '\n\nCopy .env.example to .env and configure your Shopify variant IDs.'
      )
    }
  }
}
