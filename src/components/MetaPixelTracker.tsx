import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { env } from '@/lib/env'
import { useConsent } from '@/context/ConsentContext'

const META_PIXEL_SCRIPT_ID = 'meta-pixel-script'
const META_PIXEL_SCRIPT_SRC = 'https://connect.facebook.net/en_US/fbevents.js'

const initializedPixelIds = new Set<string>()
let lastTrackedPath: string | null = null

type FbqFunction = ((command: string, ...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void
  queue?: unknown[][]
  loaded?: boolean
  version?: string
}

declare global {
  interface Window {
    fbq?: FbqFunction
    _fbq?: FbqFunction
  }
}

function getOrCreateFbq(): FbqFunction {
  if (window.fbq) {
    return window.fbq
  }

  const fbq = ((command: string, ...args: unknown[]) => {
    if (typeof fbq.callMethod === 'function') {
      fbq.callMethod(command, ...args)
      return
    }

    fbq.queue?.push([command, ...args])
  }) as FbqFunction

  fbq.queue = []
  fbq.loaded = true
  fbq.version = '2.0'

  window.fbq = fbq
  window._fbq = fbq

  return fbq
}

function ensureMetaPixelLoaded(pixelId: string) {
  const fbq = getOrCreateFbq()

  if (!document.getElementById(META_PIXEL_SCRIPT_ID)) {
    const script = document.createElement('script')
    script.id = META_PIXEL_SCRIPT_ID
    script.async = true
    script.src = META_PIXEL_SCRIPT_SRC
    document.head.appendChild(script)
  }

  if (!initializedPixelIds.has(pixelId)) {
    fbq('init', pixelId)
    initializedPixelIds.add(pixelId)
  }

  return fbq
}

/** Test-only helper: reset module-level dedupe state between tests. */
export function __resetMetaPixelTrackerForTests(): void {
  initializedPixelIds.clear()
  lastTrackedPath = null
}

export function MetaPixelTracker() {
  const location = useLocation()
  const pixelId = env.analytics.metaPixelId?.trim()
  const { choice } = useConsent()
  const marketingAllowed = choice.marketing === true

  useEffect(() => {
    if (!pixelId) {
      return
    }

    // Marketing consent is required before the first network request. On
    // withdrawal, tell Meta to stop delivery if the pixel is already loaded.
    if (!marketingAllowed) {
      if (window.fbq) {
        window.fbq('consent', 'revoke')
      }
      return
    }

    const fbq = ensureMetaPixelLoaded(pixelId)
    // Restores delivery after a previous revoke. No-op on first grant.
    fbq('consent', 'grant')

    const currentPath = `${location.pathname}${location.search}${location.hash}`

    // Dedupe key survives consent toggles: re-granting on the same page must
    // not produce a second PageView.
    if (currentPath === lastTrackedPath) {
      return
    }

    fbq('track', 'PageView')
    lastTrackedPath = currentPath
  }, [location.hash, location.pathname, location.search, pixelId, marketingAllowed])

  return null
}
