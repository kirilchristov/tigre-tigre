import { render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { PageMetadata } from '@/components/PageMetadata'
import i18n from '@/lib/i18n'

function renderMetadata(pathname = '/promo') {
  return render(
    <MemoryRouter initialEntries={[pathname]} key={pathname}>
      <PageMetadata />
    </MemoryRouter>
  )
}

describe('PageMetadata', () => {
  beforeEach(async () => {
    document.head.querySelectorAll('[data-page-metadata]').forEach((element) => element.remove())
    await i18n.changeLanguage('bg')
  })

  afterEach(async () => {
    document.head.querySelectorAll('[data-page-metadata]').forEach((element) => element.remove())
    await i18n.changeLanguage('bg')
  })

  it('upserts one canonical and updates localized metadata without duplicates', async () => {
    const duplicateCanonical = document.createElement('link')
    duplicateCanonical.rel = 'canonical'
    duplicateCanonical.href = 'https://example.com/stale'
    document.head.appendChild(duplicateCanonical)

    renderMetadata()

    expect(document.title).toBe('ОКЕЙ НАМАЛЕНИЯ | tigre tigre')
    expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1)
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://tigre-tigre.com/promo'
    )

    await i18n.changeLanguage('en')
    await waitFor(() => {
      expect(document.title).toBe('OKAY DISCOUNTS | tigre tigre')
    })
    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1)
    expect(document.head.querySelector('meta[property="og:title"]')).toHaveAttribute(
      'content',
      'OKAY DISCOUNTS | tigre tigre'
    )
  })

  it('does not overwrite an environment-level noindex directive', () => {
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex, nofollow'
    robots.dataset.environmentRobots = 'true'
    document.head.appendChild(robots)

    renderMetadata()

    expect(robots).toHaveAttribute('content', 'noindex, nofollow')
    robots.remove()
  })

  it('upserts localized homepage Product JSON-LD and removes it on promo', async () => {
    const { rerender } = renderMetadata('/')
    const productScript = document.head.querySelector(
      'script[data-page-structured-data="product"]'
    )

    expect(productScript).not.toBeNull()
    expect(JSON.parse(productScript?.textContent ?? '{}')).toMatchObject({
      '@type': 'Product',
      name: 'tigre tigre Чили крънч',
      url: 'https://tigre-tigre.com/',
    })

    await i18n.changeLanguage('en')
    await waitFor(() => {
      expect(
        JSON.parse(
          document.head.querySelector('script[data-page-structured-data="product"]')
            ?.textContent ?? '{}'
        ).name
      ).toBe('tigre tigre Chili Crunch')
    })

    rerender(
      <MemoryRouter initialEntries={['/promo']} key="/promo">
        <PageMetadata />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(
        document.head.querySelector('script[data-page-structured-data="product"]')
      ).toBeNull()
    })
  })

  it('removes a prerender-shaped stale Product script on a direct promo mount', async () => {
    const staleProduct = document.createElement('script')
    staleProduct.type = 'application/ld+json'
    staleProduct.dataset.pageStructuredData = 'product'
    staleProduct.textContent = JSON.stringify({ '@type': 'Product' })
    document.head.appendChild(staleProduct)

    renderMetadata('/promo')

    await waitFor(() => {
      expect(
        document.head.querySelector('script[data-page-structured-data="product"]')
      ).toBeNull()
    })
  })
})
