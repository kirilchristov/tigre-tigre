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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
      <Analytics />
      <SpeedInsights />
    </ErrorBoundary>
  </StrictMode>
)
