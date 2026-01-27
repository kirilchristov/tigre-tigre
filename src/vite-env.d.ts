/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Stripe
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string
  readonly VITE_STRIPE_PAYMENT_LINK_URL: string

  // Analytics (optional)
  readonly VITE_GA_MEASUREMENT_ID?: string

  // Contact
  readonly VITE_CONTACT_EMAIL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
