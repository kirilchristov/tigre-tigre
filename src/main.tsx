import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './lib/i18n'
import './styles/index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary'
import { validateEnv } from './lib/env'

// Validate environment variables in development
validateEnv()

console.log('tigre-tigre: grrrrrrr :)', import.meta.env.MODE, __APP_VERSION__)

const isTruthyFlag = (value: string | undefined) => {
  if (!value) return false
  const normalized = value.trim().toLowerCase()
  return normalized === 'true' || normalized === '1'
}

// Log version info in staging/preview environment
const isPreview =
  import.meta.env.VITE_VERCEL_ENV === 'preview' || isTruthyFlag(import.meta.env.VITE_STAGING)
const isDev = import.meta.env.DEV
const isStagingHost = window.location.hostname === 'staging.tigre-tigre.com'
const shouldBlockIndexing = isPreview || isStagingHost

if (shouldBlockIndexing) {
  const robotsContent = 'noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate'
  const upsertMeta = (name: string, content: string) => {
    const existing = document.head.querySelector(`meta[name="${name}"]`)
    if (existing) {
      existing.setAttribute('content', content)
      return
    }

    const meta = document.createElement('meta')
    meta.setAttribute('name', name)
    meta.setAttribute('content', content)
    document.head.appendChild(meta)
  }

  upsertMeta('robots', robotsContent)
  upsertMeta('googlebot', robotsContent)
}

if (isPreview || isDev) {
  console.log('%ctigre tigre App', 'font-weight: bold; font-size: 16px; color: #ff6b00;')
  console.log(`%cVersion: "${__APP_VERSION__}"`, 'color: #666;')
  console.log(
    `%cEnvironment: ${import.meta.env.VITE_VERCEL_ENV || import.meta.env.MODE}`,
    'color: #666;'
  )
  console.log(
    `%cBuild: ${import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'local'}`,
    'color: #666;'
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
      <Analytics />
      <SpeedInsights />
    </ErrorBoundary>
  </StrictMode>
)
