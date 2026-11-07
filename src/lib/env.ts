/**
 * Environment configuration
 * Safely access environment variables with type checking and defaults
 */

const DEFAULT_META_PIXEL_ID = '1883344772853949'

export const env = {
  // Analytics
  analytics: {
    gaId: import.meta.env.VITE_GA_MEASUREMENT_ID,
    metaPixelId: import.meta.env.VITE_META_PIXEL_ID ?? DEFAULT_META_PIXEL_ID,
  },

} as const
