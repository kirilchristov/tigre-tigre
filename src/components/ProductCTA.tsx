import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { QuantityStepper } from '@/components/ui/quantity-stepper'
import { cn } from '@/lib/utils'
import { useScrollReveal } from '@/hooks/useGsap'
import { env } from '@/lib/env'
import {
  buildShopifyCartPermalink,
  formatEstimatedTotal,
  type PurchaseOptionKey,
} from '@/lib/shopify'

interface ProductCTAProps {
  /** Optional className for the container */
  className?: string
  /** Show as compact variant (smaller, horizontal on mobile) */
  compact?: boolean
}

/**
 * ProductCTA displays two purchase options:
 * 1. Single jar fixed to quantity 1
 * 2. Bundle option with quantity selection starting from 2
 */
const PRICE = '6.99'
const PRICE_VALUE = 6.99
const SHIPPING_PRICE = '2'
const CURRENCY = '€'
const SINGLE_QUANTITY = 1
const BUNDLE_MIN_QUANTITY = 2
const MAX_QUANTITY = 12

const purchaseOptions: Record<
  PurchaseOptionKey,
  {
    variantId: string
    buttonVariant: 'ctaPrimary' | 'ctaSecondary'
    layoutClassName: string
    highlighted?: boolean
  }
> = {
  single: {
    variantId: env.shopify.variantId,
    buttonVariant: 'ctaSecondary',
    layoutClassName: 'relative transition-all hover:bg-muted/30',
  },
  bundle: {
    variantId: env.shopify.variantId,
    buttonVariant: 'ctaPrimary',
    layoutClassName: 'relative border-t-2 border-foreground bg-muted/30 transition-all',
    highlighted: true,
  },
}

export function ProductCTA({ className, compact = false }: ProductCTAProps) {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLDivElement>()
  const priceVars = { price: PRICE, currency: CURRENCY, shippingPrice: SHIPPING_PRICE }
  const [quantities, setQuantities] = useState<Record<PurchaseOptionKey, number>>({
    single: SINGLE_QUANTITY,
    bundle: BUNDLE_MIN_QUANTITY,
  })

  const setQuantity = (key: PurchaseOptionKey, quantity: number) => {
    setQuantities((current) => ({
      ...current,
      [key]: quantity,
    }))
  }

  const openCheckout = (key: PurchaseOptionKey) => {
    const checkoutUrl = buildShopifyCartPermalink({
      storefrontDomain: env.shopify.storefrontDomain,
      variantId: purchaseOptions[key].variantId,
      quantity: quantities[key],
    })

    if (checkoutUrl === '#') {
      return
    }

    window.location.href = checkoutUrl
  }

  return (
    <div ref={ref} className={cn('w-full max-w-4xl mx-auto my-4 px-4 font-mono', className)}>
      <div
        className={cn(
          'grid gap-4',
          compact ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 md:grid-cols-2'
        )}
      >
        {/* Single Jar Option */}
        <div className={cn(purchaseOptions.single.layoutClassName, compact ? 'p-4' : 'p-6')}>
          <div className="space-y-4">
            <div>
              <h3 className={cn('font-bold text-foreground', compact ? 'text-xl' : 'text-2xl')}>
                {t('productCTA.single.title')}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t('productCTA.single.description')}
              </p>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span
                  className={cn('font-bold text-foreground', compact ? 'text-2xl' : 'text-3xl')}
                >
                  {t('productCTA.single.price', priceVars)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {t('productCTA.single.shipping', priceVars)}
              </p>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mt-3">
                {t('productCTA.estimatedTotal', {
                  total: formatEstimatedTotal(PRICE_VALUE, quantities.single),
                  currency: CURRENCY,
                })}
              </p>
            </div>

            <Button
              onClick={() => openCheckout('single')}
              variant={purchaseOptions.single.buttonVariant}
              size={compact ? 'default' : 'lg'}
              className="w-full"
              disabled={!purchaseOptions.single.variantId}
            >
              {t('productCTA.single.button', { quantity: quantities.single })}
            </Button>
          </div>
        </div>

        {/* Multiple Jars Option (Emphasized) */}
        <div
          className={cn(
            purchaseOptions.bundle.layoutClassName,
            compact ? 'p-4' : 'p-6'
          )}
        >
          {/* Best Value Badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-brand-600 text-background text-xs font-bold px-3 py-1 rounded-[2px] uppercase tracking-wide">
              {t('productCTA.multiple.badge')}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className={cn('font-bold text-foreground', compact ? 'text-xl' : 'text-2xl')}>
                {t('productCTA.multiple.title')}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t('productCTA.multiple.description')}
              </p>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span
                  className={cn('font-bold text-foreground', compact ? 'text-2xl' : 'text-3xl')}
                >
                  {t('productCTA.multiple.price', priceVars)}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-bold text-brand-600">
                  {t('productCTA.multiple.shipping')}
                </span>
              </div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mt-3">
                {t('productCTA.estimatedTotal', {
                  total: formatEstimatedTotal(PRICE_VALUE, quantities.bundle),
                  currency: CURRENCY,
                })}
              </p>
            </div>

            <QuantityStepper
              value={quantities.bundle}
              min={BUNDLE_MIN_QUANTITY}
              max={MAX_QUANTITY}
              quantityLabel={t('productCTA.quantityLabel')}
              decrementLabel={t('productCTA.decreaseQuantity')}
              incrementLabel={t('productCTA.increaseQuantity')}
              onChange={(nextQuantity) => setQuantity('bundle', nextQuantity)}
            />

            <Button
              onClick={() => openCheckout('bundle')}
              variant={purchaseOptions.bundle.buttonVariant}
              size={compact ? 'default' : 'lg'}
              className="w-full"
              disabled={!purchaseOptions.bundle.variantId}
            >
              {t('productCTA.multiple.button', { quantity: quantities.bundle })}
            </Button>
          </div>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>{t('productCTA.trustSignal')}</p>
        <p className="mt-2 text-xs uppercase tracking-[0.16em]">
          {t('productCTA.shippingDisclaimer')}
        </p>
      </div>
    </div>
  )
}
