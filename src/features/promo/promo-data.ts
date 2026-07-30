import { SINGLE_JAR_PRODUCT } from '@/lib/product-config'

export type PromoBundleId = 'single' | 'duo' | 'trio' | 'six'
export type PromoBundleQuantity = 1 | 2 | 3 | 6
export type PromoBundleEmphasis = 'default' | 'good' | 'best'

const FREE_DELIVERY_SAVINGS_CENTS = 174

export interface PromoBundle {
  readonly id: PromoBundleId
  readonly quantity: PromoBundleQuantity
  readonly originalTotalCents: number
  readonly totalCents: number
  readonly savingsCents?: number
  readonly discountPercent: 0 | 10 | 15
  readonly freeShipping: boolean
  readonly imageSrc: string
  readonly emphasis: PromoBundleEmphasis
  readonly copyKey: `promo.bundles.${PromoBundleId}`
}

type PromoBundleDefinition = Omit<PromoBundle, 'originalTotalCents' | 'totalCents' | 'savingsCents'>

function createPromoBundle(definition: PromoBundleDefinition): PromoBundle {
  const discountPerJarCents = Math.floor(
    (SINGLE_JAR_PRODUCT.priceCents * definition.discountPercent) / 100
  )
  const originalTotalCents = SINGLE_JAR_PRODUCT.priceCents * definition.quantity
  const totalCents = (SINGLE_JAR_PRODUCT.priceCents - discountPerJarCents) * definition.quantity
  const deliverySavingsCents = definition.freeShipping ? FREE_DELIVERY_SAVINGS_CENTS : 0
  const savingsCents = originalTotalCents - totalCents + deliverySavingsCents

  return {
    ...definition,
    originalTotalCents,
    totalCents,
    ...(savingsCents > 0 ? { savingsCents } : {}),
  }
}

const bundleDefinitions: PromoBundleDefinition[] = [
  {
    id: 'single',
    quantity: 1,
    discountPercent: 0,
    freeShipping: false,
    imageSrc: '/images/promo/one.webp',
    emphasis: 'default',
    copyKey: 'promo.bundles.single',
  },
  {
    id: 'duo',
    quantity: 2,
    discountPercent: 0,
    freeShipping: true,
    imageSrc: '/images/promo/duo.webp',
    emphasis: 'good',
    copyKey: 'promo.bundles.duo',
  },
  {
    id: 'trio',
    quantity: 3,
    discountPercent: 10,
    freeShipping: true,
    imageSrc: '/images/promo/three.webp',
    emphasis: 'default',
    copyKey: 'promo.bundles.trio',
  },
  {
    id: 'six',
    quantity: 6,
    discountPercent: 15,
    freeShipping: true,
    imageSrc: '/images/promo/six.webp',
    emphasis: 'best',
    copyKey: 'promo.bundles.six',
  },
]

export const PROMO_BUNDLES: readonly Readonly<PromoBundle>[] = Object.freeze(
  bundleDefinitions.map((definition) => Object.freeze(createPromoBundle(definition)))
)

export function formatEuro(cents: number) {
  return `€${(cents / 100).toFixed(2)}`
}
