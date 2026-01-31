/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Stripe
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string
  readonly VITE_STRIPE_PAYMENT_LINK_URL: string

  // Analytics (optional)
  readonly VITE_GA_MEASUREMENT_ID?: string

  // Contact
  readonly VITE_CONTACT_EMAIL: string

  // Vercel (auto-injected)
  readonly VITE_VERCEL_ENV?: 'production' | 'preview' | 'development'
  readonly VITE_VERCEL_GIT_COMMIT_SHA?: string
  readonly VITE_STAGING?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
