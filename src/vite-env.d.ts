/// <reference types="vite/client" />

declare const __APP_VERSION__: string
declare const __APP_LAST_COMMIT__: string

interface ImportMetaEnv {
  // Analytics (optional)
  readonly VITE_GA_MEASUREMENT_ID?: string
  readonly VITE_META_PIXEL_ID?: string

  // Shopify Customer Privacy API (all public by design; VITE_ vars ship to the browser)
  readonly VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN?: string
  readonly VITE_SHOPIFY_CHECKOUT_ROOT_DOMAIN?: string
  readonly VITE_SHOPIFY_STOREFRONT_ROOT_DOMAIN?: string
  readonly VITE_SHOPIFY_CONSENT_API_URL?: string
  readonly VITE_SHOPIFY_CONSENT_TIMEOUT_MS?: string

  // Vercel (auto-injected)
  readonly VITE_VERCEL_ENV?: 'production' | 'preview' | 'development'
  readonly VITE_VERCEL_GIT_COMMIT_SHA?: string
  readonly VITE_STAGING?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
