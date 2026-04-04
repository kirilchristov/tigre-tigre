const DEFAULT_STOREFRONT_DOMAIN = 'shop.tigre-tigre.com'
const FALLBACK_CHECKOUT_URL = '#'

export type PurchaseOptionKey = 'single' | 'bundle'

interface ShopifyCheckoutParams {
  storefrontDomain?: string
  variantId?: string
  quantity: number
}

export function normalizeShopifyStorefrontUrl(storefrontDomain?: string) {
  const trimmedDomain = storefrontDomain?.trim() || DEFAULT_STOREFRONT_DOMAIN

  if (trimmedDomain.startsWith('http://') || trimmedDomain.startsWith('https://')) {
    return trimmedDomain.replace(/\/+$/, '')
  }

  return `https://${trimmedDomain.replace(/\/+$/, '')}`
}

export function buildShopifyCartPermalink({
  storefrontDomain,
  variantId,
  quantity,
}: ShopifyCheckoutParams) {
  const normalizedVariantId = variantId?.trim()

  if (!normalizedVariantId) {
    return FALLBACK_CHECKOUT_URL
  }

  const normalizedQuantity = Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1

  return `${normalizeShopifyStorefrontUrl(storefrontDomain)}/cart/${normalizedVariantId}:${normalizedQuantity}`
}

export function formatEstimatedTotal(price: number, quantity: number) {
  const normalizedQuantity = Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1
  const total = price * normalizedQuantity

  return total.toFixed(2)
}
