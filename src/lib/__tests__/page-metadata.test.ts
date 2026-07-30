import { describe, expect, it } from 'vitest'
import { getPageHeadElements, getPageMetadata } from '@/lib/page-metadata'

describe('getPageMetadata()', () => {
  it('returns indexed Bulgarian promo metadata', () => {
    expect(getPageMetadata('/promo', 'bg')).toMatchObject({
      title: 'Окей оферти за чили крънч | tigre tigre',
      description:
        '2 буркана за спокойствие, 3 за щастие, 6 и за споделяне. Безплатна доставка от 2 броя и до 15% отстъпка.',
      socialTitle: 'Повече буркани. По-малко мислене.',
      socialDescription:
        'Избери 2, 3 или 6 буркана. Безплатна доставка от 2 и до 15% отстъпка. Напълно окей.',
      canonical: 'https://www.tigre-tigre.com/promo',
      image: 'https://www.tigre-tigre.com/images/promo/social.jpg',
      imageType: 'image/jpeg',
      imageWidth: 1200,
      imageHeight: 630,
      robots: 'index, follow',
      locale: 'bg_BG',
    })
  })

  it('returns the English promo adaptation and stable alternates', () => {
    const metadata = getPageMetadata('/promo', 'en', '?lang=en')

    expect(metadata).toMatchObject({
      title: 'Okay Chili Crunch Offers | tigre tigre',
      description:
        'Two jars for peace of mind. Three’s a charm. Six leaves enough to share. Free delivery from 2 jars and up to 15% off.',
      socialTitle: 'More jars. Less thinking.',
      socialDescription:
        'Pick 2, 3, or 6 jars. Free delivery from 2 and up to 15% off. Perfectly okay.',
      canonical: 'https://www.tigre-tigre.com/promo?lang=en',
    })
    expect(metadata.alternates).toEqual({
      bg: 'https://www.tigre-tigre.com/promo',
      en: 'https://www.tigre-tigre.com/promo?lang=en',
      default: 'https://www.tigre-tigre.com/promo',
    })
  })

  it('canonicalizes explicit Bulgarian and unsupported variants to the default page', () => {
    expect(getPageMetadata('/promo', 'bg', '?lang=bg').canonical).toBe(
      'https://www.tigre-tigre.com/promo'
    )
    expect(getPageMetadata('/promo', 'bg', '?lang=unsupported').canonical).toBe(
      'https://www.tigre-tigre.com/promo'
    )
  })

  it('returns distinct search and social copy for the Bulgarian homepage', () => {
    expect(getPageMetadata('/', 'bg')).toMatchObject({
      title: 'tigre tigre — безсрамно вкусен чили крънч',
      description:
        'Супер хрупкав чили крънч с опасно много чесън, лук и пикантно олио. Без ядки, без соев сос, без срам. Слагаш го върху всичко.',
      socialTitle: 'чили крънч за мазни пръсти | tigre tigre',
      socialDescription:
        'Чесън, лук, чили и червен пипер в пикантно олио. Яде се на око, на корем и без срам.',
      canonical: 'https://www.tigre-tigre.com/',
      imageAlt: 'Буркан tigre tigre чили крънч на бял фон',
    })
  })

  it('returns distinct search and social copy for the English homepage', () => {
    expect(getPageMetadata('/', 'en', '?lang=en')).toMatchObject({
      title: 'tigre tigre — shamelessly delicious chili crunch',
      description:
        'Extra-crispy chili crunch with dangerous amounts of garlic, onion, chili and spicy oil. No nuts, no soy sauce, no shame.',
      socialTitle: 'chili crunch for greasy fingers | tigre tigre',
      socialDescription:
        'Garlic, onion, chili and red pepper in spicy oil. Spoon it onto anything. Eat without shame.',
      canonical: 'https://www.tigre-tigre.com/?lang=en',
      imageAlt: 'A jar of tigre tigre chili crunch on a white background',
    })
  })

  it('marks unknown routes as noindex instead of creating a soft homepage canonical', () => {
    expect(getPageMetadata('/missing', 'bg')).toMatchObject({
      canonical: 'https://www.tigre-tigre.com/missing',
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
      name: 'tigre tigre екстра хрупкав чили крънч, 180 г',
      description:
        'Супер хрупкав чили крънч с чесън, лук, чили и червен пипер в пикантно олио. Без ядки и соев сос. Лютивост 2/5.',
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

  it('emits homepage WebSite JSON-LD and omits homepage structured data elsewhere', () => {
    const homeElements = [...getPageHeadElements(getPageMetadata('/', 'bg'))]
    const promoElements = [...getPageHeadElements(getPageMetadata('/promo', 'en'))]
    const notFoundElements = [...getPageHeadElements(getPageMetadata('/missing', 'bg'))]
    const websiteScript = homeElements.find(
      (element) =>
        element.type === 'script' && element.props['data-page-structured-data'] === 'website'
    ) as { children?: string } | undefined

    expect(JSON.parse(websiteScript?.children ?? '{}')).toEqual({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'tigre tigre',
      url: 'https://www.tigre-tigre.com/',
    })

    expect(promoElements.some((element) => element.type === 'script')).toBe(false)
    expect(notFoundElements.some((element) => element.type === 'script')).toBe(false)
  })
})
