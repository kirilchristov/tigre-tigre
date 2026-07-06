/// <reference types="vite/client" />

declare const __APP_VERSION__: string

interface ImportMetaEnv {
  // Analytics (optional)
  readonly VITE_GA_MEASUREMENT_ID?: string
  readonly VITE_META_PIXEL_ID?: string

  // Vercel (auto-injected)
  readonly VITE_VERCEL_ENV?: 'production' | 'preview' | 'development'
  readonly VITE_VERCEL_GIT_COMMIT_SHA?: string
  readonly VITE_STAGING?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
