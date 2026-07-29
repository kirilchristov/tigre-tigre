import { describe, expect, it } from 'vitest'
import { getPageHeadElements, getPageMetadata } from '@/lib/page-metadata'

describe('getPageMetadata()', () => {
  it('returns indexed Bulgarian promo metadata', () => {
    expect(getPageMetadata('/promo', 'bg')).toMatchObject({
      title: 'ОКЕЙ НАМАЛЕНИЯ | tigre tigre',
      canonical: 'https://tigre-tigre.com/promo',
      image: 'https://tigre-tigre.com/images/promo/social.jpg',
      imageType: 'image/jpeg',
      imageWidth: 1200,
      imageHeight: 630,
      robots: 'index, follow',
      locale: 'bg_BG',
    })
  })

  it('returns the English promo adaptation and stable alternates', () => {
    const metadata = getPageMetadata('/promo', 'en', '?lang=en')

    expect(metadata.title).toBe('OKAY DISCOUNTS | tigre tigre')
    expect(metadata.canonical).toBe('https://tigre-tigre.com/promo?lang=en')
    expect(metadata.alternates).toEqual({
      bg: 'https://tigre-tigre.com/promo?lang=bg',
      en: 'https://tigre-tigre.com/promo?lang=en',
      default: 'https://tigre-tigre.com/promo',
    })
  })

  it('self-canonicalizes explicit Bulgarian variants and strips unsupported languages', () => {
    expect(getPageMetadata('/promo', 'bg', '?lang=bg').canonical).toBe(
      'https://tigre-tigre.com/promo?lang=bg'
    )
    expect(getPageMetadata('/promo', 'bg', '?lang=unsupported').canonical).toBe(
      'https://tigre-tigre.com/promo'
    )
  })

  it('marks unknown routes as noindex instead of creating a soft homepage canonical', () => {
    expect(getPageMetadata('/missing', 'bg')).toMatchObject({
      canonical: 'https://tigre-tigre.com/missing',
      robots: 'noindex, follow',
      title: 'Страницата не е намерена | tigre tigre',
    })
  })

  it('emits valid Product JSON-LD with an active single-jar offer', () => {
    const elements = [...getPageHeadElements(getPageMetadata('/', 'bg'))]
    const productScript = elements.find(
      (element) =>
        element.type === 'script' && element.props['data-page-structured-data'] === 'product'
    ) as { children?: string } | undefined

    expect(productScript?.children).toBeTypeOf('string')

    const product = JSON.parse(productScript?.children ?? '{}')
    expect(product).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'tigre tigre Чили крънч',
      brand: { '@type': 'Brand', name: 'tigre tigre' },
      offers: {
        '@type': 'Offer',
        url: 'https://shop.tigre-tigre.com/products/tigre-tigre-chili-crunch',
        price: '7.99',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
      },
    })
  })

  it('omits homepage Product JSON-LD from promo and unknown routes', () => {
    const promoElements = [...getPageHeadElements(getPageMetadata('/promo', 'en'))]
    const notFoundElements = [...getPageHeadElements(getPageMetadata('/missing', 'bg'))]

    expect(promoElements.some((element) => element.type === 'script')).toBe(false)
    expect(notFoundElements.some((element) => element.type === 'script')).toBe(false)
  })
})
