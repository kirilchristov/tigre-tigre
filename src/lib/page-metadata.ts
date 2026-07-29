import { SINGLE_JAR_PRODUCT, STOREFRONT_URL } from '@/lib/product-config'

const SITE_URL = 'https://tigre-tigre.com'
const HOME_IMAGE = `${SITE_URL}/images/product-shots/2026_front-2048x2048.webp`
const PROMO_IMAGE = `${SITE_URL}/images/promo/social.jpg`

export type SupportedPageLanguage = 'bg' | 'en'

export interface PageMetadata {
  readonly title: string
  readonly description: string
  readonly canonical: string
  readonly image: string
  readonly imageType: 'image/webp' | 'image/jpeg'
  readonly imageWidth: number
  readonly imageHeight: number
  readonly imageAlt: string
  readonly robots: 'index, follow' | 'noindex, follow'
  readonly locale: 'bg_BG' | 'en_US'
  readonly alternates: Readonly<{
    bg: string
    en: string
    default: string
  }>
  readonly product?: ProductStructuredData
}

interface ProductStructuredData {
  readonly '@context': 'https://schema.org'
  readonly '@type': 'Product'
  readonly '@id': string
  readonly name: string
  readonly description: string
  readonly image: string
  readonly url: string
  readonly brand: Readonly<{
    '@type': 'Brand'
    name: 'tigre tigre'
  }>
  readonly offers: Readonly<{
    '@type': 'Offer'
    url: string
    price: string
    priceCurrency: 'EUR'
    availability: 'https://schema.org/InStock'
    itemCondition: 'https://schema.org/NewCondition'
    seller: Readonly<{
      '@type': 'Organization'
      name: 'tigre tigre'
      url: string
    }>
  }>
}

const normalizeLanguage = (language: string): SupportedPageLanguage =>
  language.toLowerCase().startsWith('en') ? 'en' : 'bg'

const metadataByRoute = {
  home: {
    bg: {
      title: 'tigre tigre - Чили крънч',
      description:
        'Безсрамно вкусен, екстра хрупкав чили крънч с чесън, лук и люта чушка.',
      imageAlt: 'Буркан tigre tigre чили крънч',
    },
    en: {
      title: 'tigre tigre - Chili Crunch',
      description:
        'Shamelessly delicious, extra-crispy chili crunch with garlic, onion, and chili.',
      imageAlt: 'tigre tigre chili crunch jar',
    },
  },
  promo: {
    bg: {
      title: 'ОКЕЙ НАМАЛЕНИЯ | tigre tigre',
      description:
        'Вземи 1, 2, 3 или 6 буркана tigre tigre с безплатна доставка и до 15% намаление.',
      imageAlt: 'Шест буркана tigre tigre чили крънч',
    },
    en: {
      title: 'OKAY DISCOUNTS | tigre tigre',
      description:
        'Get 1, 2, 3, or 6 jars of tigre tigre with free delivery and up to 15% off.',
      imageAlt: 'Six jars of tigre tigre chili crunch',
    },
  },
  notFound: {
    bg: {
      title: 'Страницата не е намерена | tigre tigre',
      description: 'Тази страница не съществува или е преместена.',
      imageAlt: 'Буркан tigre tigre чили крънч',
    },
    en: {
      title: 'Page not found | tigre tigre',
      description: 'This page does not exist or has moved.',
      imageAlt: 'tigre tigre chili crunch jar',
    },
  },
} as const

export function getPageMetadata(
  pathname: string,
  language: string,
  search = ''
): PageMetadata {
  const localeLanguage = normalizeLanguage(language)
  const isPromo = pathname === '/promo' || pathname === '/promo/'
  const isHome = pathname === '/'
  const route = isPromo ? 'promo' : isHome ? 'home' : 'notFound'
  const content = metadataByRoute[route][localeLanguage]
  const baseCanonical = isPromo
    ? `${SITE_URL}/promo`
    : isHome
      ? `${SITE_URL}/`
      : `${SITE_URL}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
  const requestedLanguage = new URLSearchParams(search).get('lang')
  const explicitLanguage =
    requestedLanguage === 'bg' || requestedLanguage === 'en' ? requestedLanguage : null
  const canonical =
    route !== 'notFound' && explicitLanguage
      ? `${baseCanonical}?lang=${explicitLanguage}`
      : baseCanonical

  return {
    ...content,
    canonical,
    image: isPromo ? PROMO_IMAGE : HOME_IMAGE,
    imageType: isPromo ? 'image/jpeg' : 'image/webp',
    imageWidth: isPromo ? 1200 : 2048,
    imageHeight: isPromo ? 630 : 2048,
    robots: route === 'notFound' ? 'noindex, follow' : 'index, follow',
    locale: localeLanguage === 'en' ? 'en_US' : 'bg_BG',
    alternates: {
      bg: `${baseCanonical}?lang=bg`,
      en: `${baseCanonical}?lang=en`,
      default: baseCanonical,
    },
    ...(route === 'home'
      ? {
          product: {
            '@context': 'https://schema.org',
            '@type': 'Product',
            '@id': `${SITE_URL}/#product`,
            name:
              localeLanguage === 'en'
                ? 'tigre tigre Chili Crunch'
                : 'tigre tigre Чили крънч',
            description: content.description,
            image: HOME_IMAGE,
            url: canonical,
            brand: {
              '@type': 'Brand',
              name: 'tigre tigre',
            },
            offers: {
              '@type': 'Offer',
              url: SINGLE_JAR_PRODUCT.productUrl,
              price: SINGLE_JAR_PRODUCT.price,
              priceCurrency: 'EUR',
              availability: SINGLE_JAR_PRODUCT.availability,
              itemCondition: 'https://schema.org/NewCondition',
              seller: {
                '@type': 'Organization',
                name: 'tigre tigre',
                url: STOREFRONT_URL,
              },
            },
          } satisfies ProductStructuredData,
        }
      : {}),
  }
}

export interface PageHeadElement {
  readonly type: 'meta' | 'link' | 'script'
  readonly props: Readonly<Record<string, string>>
  readonly children?: string
}

export function getPageHeadElements(metadata: PageMetadata): Set<PageHeadElement> {
  return new Set<PageHeadElement>([
    { type: 'meta', props: { name: 'description', content: metadata.description } },
    { type: 'meta', props: { name: 'robots', content: metadata.robots } },
    { type: 'meta', props: { property: 'og:type', content: 'website' } },
    { type: 'meta', props: { property: 'og:url', content: metadata.canonical } },
    { type: 'meta', props: { property: 'og:title', content: metadata.title } },
    { type: 'meta', props: { property: 'og:description', content: metadata.description } },
    { type: 'meta', props: { property: 'og:image', content: metadata.image } },
    { type: 'meta', props: { property: 'og:image:type', content: metadata.imageType } },
    {
      type: 'meta',
      props: { property: 'og:image:width', content: String(metadata.imageWidth) },
    },
    {
      type: 'meta',
      props: { property: 'og:image:height', content: String(metadata.imageHeight) },
    },
    { type: 'meta', props: { property: 'og:image:alt', content: metadata.imageAlt } },
    { type: 'meta', props: { property: 'og:locale', content: metadata.locale } },
    { type: 'meta', props: { name: 'twitter:card', content: 'summary_large_image' } },
    { type: 'meta', props: { name: 'twitter:title', content: metadata.title } },
    { type: 'meta', props: { name: 'twitter:description', content: metadata.description } },
    { type: 'meta', props: { name: 'twitter:image', content: metadata.image } },
    { type: 'meta', props: { name: 'twitter:image:alt', content: metadata.imageAlt } },
    { type: 'link', props: { rel: 'canonical', href: metadata.canonical } },
    { type: 'link', props: { rel: 'alternate', hreflang: 'bg', href: metadata.alternates.bg } },
    { type: 'link', props: { rel: 'alternate', hreflang: 'en', href: metadata.alternates.en } },
    {
      type: 'link',
      props: { rel: 'alternate', hreflang: 'x-default', href: metadata.alternates.default },
    },
    ...(metadata.product
      ? [
          {
            type: 'script' as const,
            props: {
              type: 'application/ld+json',
              'data-page-structured-data': 'product',
            },
            children: JSON.stringify(metadata.product).replace(/</g, '\\u003c'),
          },
        ]
      : []),
  ])
}
