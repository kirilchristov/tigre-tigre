import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useScrollReveal } from '@/hooks/useGsap'
import { env } from '@/lib/env'

interface ProductCTAProps {
  /** Optional className for the container */
  className?: string
  /** Show as compact variant (smaller, horizontal on mobile) */
  compact?: boolean
}

/**
 * ProductCTA displays two purchase options:
 * 1. Single jar with shipping cost
 * 2. Multiple jars with free shipping (emphasized as better deal)
 */
const PRICE = '6.99'
const SHIPPING_PRICE = '2'
const CURRENCY = '€'

export function ProductCTA({ className, compact = false }: ProductCTAProps) {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLDivElement>()
  const priceVars = { price: PRICE, currency: CURRENCY, shippingPrice: SHIPPING_PRICE }

  const handleBuySingle = () => {
    window.location.href = env.stripe.paymentLinkSingle
  }

  const handleBuyMultiple = () => {
    window.location.href = env.stripe.paymentLinkBundle
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
        <div className={cn('relative transition-all hover:bg-muted/30', compact ? 'p-4' : 'p-6')}>
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
            </div>

            <Button
              onClick={handleBuySingle}
              variant="ctaSecondary"
              size={compact ? 'default' : 'lg'}
              className="w-full"
            >
              {t('productCTA.single.button')}
            </Button>
          </div>
        </div>

        {/* Multiple Jars Option (Emphasized) */}
        <div
          className={cn(
            'relative border-t-2 border-foreground bg-muted/30 transition-all',
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
                <span className="text-xs text-muted-foreground line-through">
                  {t('productCTA.multiple.shippingSaved', priceVars)}
                </span>
                <span className="text-sm font-bold text-brand-600">
                  {t('productCTA.multiple.shipping')}
                </span>
              </div>
            </div>

            <Button
              onClick={handleBuyMultiple}
              variant="ctaPrimary"
              size={compact ? 'default' : 'lg'}
              className="w-full"
            >
              {t('productCTA.multiple.button')}
            </Button>
          </div>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>{t('productCTA.trustSignal')}</p>
      </div>
    </div>
  )
}
