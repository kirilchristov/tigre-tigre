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

console.log('tigre-tigre: grrrrrrr :)', import.meta.env.MODE, '0.1.0')

// Log version info in staging environment
if (import.meta.env.MODE === 'staging' || (import.meta.env.DEV && import.meta.env.VITE_STAGING)) {
  console.log('%ctigre tigre App', 'font-weight: bold; font-size: 16px; color: #ff6b00;')
  console.log(`%cVersion: "0.0.1"`, 'color: #666;')
  console.log(`%cEnvironment: ${import.meta.env.MODE}`, 'color: #666;')
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
