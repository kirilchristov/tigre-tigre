import { SINGLE_JAR_PRODUCT, STOREFRONT_URL } from '@/lib/product-config'

const SITE_URL = 'https://www.tigre-tigre.com'
const HOME_IMAGE = `${SITE_URL}/images/product-shots/2026_front-2048x2048.webp`
const PROMO_IMAGE = `${SITE_URL}/images/promo/social.jpg`

export type SupportedPageLanguage = 'bg' | 'en'

export interface PageMetadata {
  readonly title: string
  readonly description: string
  readonly socialTitle: string
  readonly socialDescription: string
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
  readonly website?: WebsiteStructuredData
}

interface WebsiteStructuredData {
  readonly '@context': 'https://schema.org'
  readonly '@type': 'WebSite'
  readonly name: 'tigre tigre'
  readonly url: string
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
      title: 'tigre tigre — безсрамно вкусен чили крънч',
      description:
        'Супер хрупкав чили крънч с опасно много чесън, лук и пикантно олио. Без ядки, без соев сос, без срам. Слагаш го върху всичко.',
      socialTitle: 'чили крънч за мазни пръсти | tigre tigre',
      socialDescription:
        'Чесън, лук, чили и червен пипер в пикантно олио. Яде се на око, на корем и без срам.',
      imageAlt: 'Буркан tigre tigre чили крънч на бял фон',
    },
    en: {
      title: 'tigre tigre — shamelessly delicious chili crunch',
      description:
        'Extra-crispy chili crunch with dangerous amounts of garlic, onion, chili and spicy oil. No nuts, no soy sauce, no shame.',
      socialTitle: 'chili crunch for greasy fingers | tigre tigre',
      socialDescription:
        'Garlic, onion, chili and red pepper in spicy oil. Spoon it onto anything. Eat without shame.',
      imageAlt: 'A jar of tigre tigre chili crunch on a white background',
    },
  },
  promo: {
    bg: {
      title: 'Окей оферти за чили крънч | tigre tigre',
      description:
        '2 буркана за спокойствие, 3 за щастие, 6 и за споделяне. Безплатна доставка от 2 броя и до 15% отстъпка.',
      socialTitle: 'Повече буркани. По-малко мислене.',
      socialDescription:
        'Избери 2, 3 или 6 буркана. Безплатна доставка от 2 и до 15% отстъпка. Напълно окей.',
      imageAlt: 'Шест буркана tigre tigre чили крънч',
    },
    en: {
      title: 'Okay Chili Crunch Offers | tigre tigre',
      description:
        'Two jars for peace of mind. Three’s a charm. Six leaves enough to share. Free delivery from 2 jars and up to 15% off.',
      socialTitle: 'More jars. Less thinking.',
      socialDescription:
        'Pick 2, 3, or 6 jars. Free delivery from 2 and up to 15% off. Perfectly okay.',
      imageAlt: 'Six jars of tigre tigre chili crunch',
    },
  },
  notFound: {
    bg: {
      title: 'Страницата не е намерена | tigre tigre',
      description: 'Тази страница не съществува или е преместена.',
      socialTitle: 'Страницата не е намерена | tigre tigre',
      socialDescription: 'Тази страница не съществува или е преместена.',
      imageAlt: 'Буркан tigre tigre чили крънч',
    },
    en: {
      title: 'Page not found | tigre tigre',
      description: 'This page does not exist or has moved.',
      socialTitle: 'Page not found | tigre tigre',
      socialDescription: 'This page does not exist or has moved.',
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
  const canonical =
    route !== 'notFound' && requestedLanguage === 'en'
      ? `${baseCanonical}?lang=en`
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
      bg: baseCanonical,
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
                ? 'tigre tigre Extra-Crispy Chili Crunch, 180 g'
                : 'tigre tigre екстра хрупкав чили крънч, 180 г',
            description:
              localeLanguage === 'en'
                ? 'Extra-crispy chili crunch with garlic, onion, chili and red pepper in spicy oil. No nuts or soy sauce. Heat level 2/5.'
                : 'Супер хрупкав чили крънч с чесън, лук, чили и червен пипер в пикантно олио. Без ядки и соев сос. Лютивост 2/5.',
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
          website: {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'tigre tigre',
            url: `${SITE_URL}/`,
          } satisfies WebsiteStructuredData,
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
    { type: 'meta', props: { property: 'og:title', content: metadata.socialTitle } },
    {
      type: 'meta',
      props: { property: 'og:description', content: metadata.socialDescription },
    },
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
    { type: 'meta', props: { name: 'twitter:title', content: metadata.socialTitle } },
    {
      type: 'meta',
      props: { name: 'twitter:description', content: metadata.socialDescription },
    },
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
    ...(metadata.website
      ? [
          {
            type: 'script' as const,
            props: {
              type: 'application/ld+json',
              'data-page-structured-data': 'website',
            },
            children: JSON.stringify(metadata.website).replace(/</g, '\\u003c'),
          },
        ]
      : []),
  ])
}
