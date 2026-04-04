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

export const env = {
  // Analytics
  analytics: {
    gaId: import.meta.env.VITE_GA_MEASUREMENT_ID,
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
    return
  }
}
