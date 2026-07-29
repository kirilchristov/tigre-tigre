const SINGLE_JAR_PRICE_CENTS = 799

export const STOREFRONT_URL = 'https://shop.tigre-tigre.com'

export const SINGLE_JAR_PRODUCT = Object.freeze({
  variantId: '56986218955100',
  priceCents: SINGLE_JAR_PRICE_CENTS,
  price: (SINGLE_JAR_PRICE_CENTS / 100).toFixed(2),
  productUrl: `${STOREFRONT_URL}/products/tigre-tigre-chili-crunch`,
  availability: 'https://schema.org/InStock' as const,
})
