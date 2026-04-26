import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { env } from '@/lib/env'

const GOOGLE_TAG_SCRIPT_ID = 'google-tag-script'
const GOOGLE_TAG_SCRIPT_SRC = 'https://www.googletagmanager.com/gtag/js'

type GtagCommand = 'js' | 'config' | 'event' | 'set'
type GtagFunction = (command: GtagCommand, target: string | Date, params?: Record<string, unknown>) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: GtagFunction
  }
}

let initializedMeasurementId: string | null = null
let lastTrackedPath: string | null = null

function getOrCreateGtag(): GtagFunction {
  if (window.gtag) {
    return window.gtag
  }

  window.dataLayer = window.dataLayer || []
  window.gtag = ((...args: unknown[]) => {
    window.dataLayer?.push(args)
  }) as GtagFunction

  return window.gtag
}

function ensureGoogleAnalyticsLoaded(measurementId: string) {
  const gtag = getOrCreateGtag()

  if (!document.getElementById(GOOGLE_TAG_SCRIPT_ID)) {
    const script = document.createElement('script')
    script.id = GOOGLE_TAG_SCRIPT_ID
    script.async = true
    script.src = `${GOOGLE_TAG_SCRIPT_SRC}?id=${encodeURIComponent(measurementId)}`
    document.head.appendChild(script)
  }

  if (initializedMeasurementId !== measurementId) {
    gtag('js', new Date())
    gtag('config', measurementId, { send_page_view: false })
    initializedMeasurementId = measurementId
  }

  return gtag
}

export function GoogleAnalyticsTracker() {
  const location = useLocation()
  const measurementId = env.analytics.gaId?.trim()

  useEffect(() => {
    if (!measurementId) {
      return
    }

    const gtag = ensureGoogleAnalyticsLoaded(measurementId)
    const currentPath = `${location.pathname}${location.search}${location.hash}`

    if (currentPath === lastTrackedPath) {
      return
    }

    gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: currentPath,
      page_title: document.title,
    })
    lastTrackedPath = currentPath
  }, [location.hash, location.pathname, location.search, measurementId])

  return null
}
