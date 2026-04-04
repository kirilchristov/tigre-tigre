/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Shopify
  readonly VITE_SHOPIFY_STOREFRONT_DOMAIN?: string
  readonly VITE_SHOPIFY_VARIANT_ID: string

  // Analytics (optional)
  readonly VITE_GA_MEASUREMENT_ID?: string

  // Contact
  readonly VITE_CONTACT_EMAIL: string

  // Feature flags
  readonly VITE_SOLD_OUT_MODE?: string

  // Vercel (auto-injected)
  readonly VITE_VERCEL_ENV?: 'production' | 'preview' | 'development'
  readonly VITE_VERCEL_GIT_COMMIT_SHA?: string
  readonly VITE_STAGING?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
