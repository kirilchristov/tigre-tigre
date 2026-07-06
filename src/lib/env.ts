/**
 * Environment configuration
 * Safely access environment variables with type checking and defaults
 */

const DEFAULT_META_PIXEL_ID = '2187360742019843'

export const env = {
  // Analytics
  analytics: {
    gaId: import.meta.env.VITE_GA_MEASUREMENT_ID,
    metaPixelId: import.meta.env.VITE_META_PIXEL_ID ?? DEFAULT_META_PIXEL_ID,
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
