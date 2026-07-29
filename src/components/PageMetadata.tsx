import { useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import {
  getPageHeadElements,
  getPageMetadata,
  type PageHeadElement,
} from '@/lib/page-metadata'

function upsertHeadElement({ type, props, children }: PageHeadElement) {
  const identity =
    type === 'meta'
      ? props.name
        ? `meta[name="${props.name}"]`
        : `meta[property="${props.property}"]`
      : type === 'link'
        ? props.rel === 'alternate'
          ? `link[rel="alternate"][hreflang="${props.hreflang}"]`
          : `link[rel="${props.rel}"]`
        : `script[data-page-structured-data="${props['data-page-structured-data']}"]`
  const matches = Array.from(document.head.querySelectorAll<HTMLElement>(identity))
  const element = matches[0] ?? document.createElement(type)

  if (props.name === 'robots' && element.dataset.environmentRobots === 'true') {
    return
  }

  for (const [key, value] of Object.entries(props)) {
    element.setAttribute(key, value)
  }
  if (type === 'script') {
    element.textContent = children ?? ''
  }
  element.dataset.pageMetadata = 'true'

  if (!element.parentNode) {
    document.head.appendChild(element)
  }

  for (const duplicate of matches.slice(1)) {
    duplicate.remove()
  }
}

export function PageMetadata() {
  const location = useLocation()
  const { i18n } = useTranslation()
  const language = i18n.resolvedLanguage ?? i18n.language

  useLayoutEffect(() => {
    const metadata = getPageMetadata(location.pathname, language, location.search)
    const headElements = [...getPageHeadElements(metadata)]
    document.title = metadata.title
    document.documentElement.lang = language.toLowerCase().startsWith('en') ? 'en' : 'bg'

    for (const element of headElements) {
      upsertHeadElement(element)
    }

    document.head
      .querySelectorAll<HTMLElement>('script[data-page-structured-data]')
      .forEach((existingScript) => {
        const structuredDataType = existingScript.dataset.pageStructuredData
        const isExpected = headElements.some(
          (element) =>
            element.type === 'script' &&
            element.props['data-page-structured-data'] === structuredDataType
        )

        if (!isExpected) {
          existingScript.remove()
        }
      })
  }, [language, location.pathname, location.search])

  return null
}
