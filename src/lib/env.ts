/**
 * Environment configuration
 * Safely access environment variables with type checking and defaults
 */

export const env = {
  // Stripe
  stripe: {
    publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
    paymentLinkUrl: import.meta.env.VITE_STRIPE_PAYMENT_LINK_URL || '#',
  },

  // Analytics
  analytics: {
    gaId: import.meta.env.VITE_GA_MEASUREMENT_ID,
  },

  // Contact
  contact: {
    email: import.meta.env.VITE_CONTACT_EMAIL || 'hello@tigre-tigre.com',
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

    if (!env.stripe.publishableKey) {
      warnings.push('VITE_STRIPE_PUBLISHABLE_KEY is not set')
    }

    if (!env.stripe.paymentLinkUrl || env.stripe.paymentLinkUrl === '#') {
      warnings.push('VITE_STRIPE_PAYMENT_LINK_URL is not set')
    }

    if (warnings.length > 0) {
      console.warn(
        '⚠️ Missing environment variables:\n' +
          warnings.map((w) => `  - ${w}`).join('\n') +
          '\n\nCopy .env.example to .env.local and configure your variables.'
      )
    }
  }
}
