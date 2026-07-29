import { SINGLE_JAR_PRODUCT } from '@/lib/product-config'

export const PROMO_STORE_URL = 'https://shop.tigre-tigre.com/'

export type PromoBundleId = 'single' | 'duo' | 'trio' | 'six'
export type PromoBundleQuantity = 1 | 2 | 3 | 6
export type PromoBundleEmphasis = 'default' | 'good' | 'best'

export interface PromoBundle {
  readonly id: PromoBundleId
  readonly quantity: PromoBundleQuantity
  readonly totalCents: number
  readonly savingsCents?: number
  readonly discountPercent: 0 | 10 | 15
  readonly freeShipping: boolean
  readonly imageSrc: string
  readonly emphasis: PromoBundleEmphasis
  readonly shopUrl: string
  readonly copyKey: `promo.bundles.${PromoBundleId}`
}

const bundleDefinitions: PromoBundle[] = [
  {
    id: 'single',
    quantity: 1,
    totalCents: SINGLE_JAR_PRODUCT.priceCents,
    discountPercent: 0,
    freeShipping: false,
    imageSrc: '/images/promo/one.webp',
    emphasis: 'default',
    shopUrl: PROMO_STORE_URL,
    copyKey: 'promo.bundles.single',
  },
  {
    id: 'duo',
    quantity: 2,
    totalCents: 1598,
    savingsCents: 170,
    discountPercent: 0,
    freeShipping: true,
    imageSrc: '/images/promo/duo.webp',
    emphasis: 'good',
    shopUrl: PROMO_STORE_URL,
    copyKey: 'promo.bundles.duo',
  },
  {
    id: 'trio',
    quantity: 3,
    totalCents: 2160,
    savingsCents: 240,
    discountPercent: 10,
    freeShipping: true,
    imageSrc: '/images/promo/three.webp',
    emphasis: 'default',
    shopUrl: PROMO_STORE_URL,
    copyKey: 'promo.bundles.trio',
  },
  {
    id: 'six',
    quantity: 6,
    totalCents: 4080,
    savingsCents: 790,
    discountPercent: 15,
    freeShipping: true,
    imageSrc: '/images/promo/six.webp',
    emphasis: 'best',
    shopUrl: PROMO_STORE_URL,
    copyKey: 'promo.bundles.six',
  },
]

export const PROMO_BUNDLES: readonly Readonly<PromoBundle>[] = Object.freeze(
  bundleDefinitions.map((bundle) => Object.freeze({ ...bundle }))
)

export function formatEuro(cents: number) {
  return `€${(cents / 100).toFixed(2)}`
}
