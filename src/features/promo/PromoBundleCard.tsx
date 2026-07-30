import { ArrowRight, Truck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { SINGLE_JAR_PRODUCT } from '@/lib/product-config'
import { buildShopifyCartPermalink } from '@/lib/shopify'
import { cn } from '@/lib/utils'
import { formatEuro, type PromoBundle } from './promo-data'

interface PromoBundleCardProps {
  readonly bundle: Readonly<PromoBundle>
}

function BundleImage({ bundle, alt }: { bundle: Readonly<PromoBundle>; alt: string }) {
  return (
    <img
      src={bundle.imageSrc}
      alt={alt}
      width={1024}
      height={1024}
      loading="lazy"
      className="h-full w-full object-contain"
    />
  )
}

export function PromoBundleCard({ bundle }: PromoBundleCardProps) {
  const { t } = useTranslation()
  const title = t(`${bundle.copyKey}.title`)
  const offerLabel =
    bundle.emphasis === 'good'
      ? t('promo.labels.goodOffer')
      : bundle.emphasis === 'best'
        ? t('promo.labels.bestOffer')
        : null
  const cartUrl = buildShopifyCartPermalink({
    variantId: SINGLE_JAR_PRODUCT.variantId,
    quantity: bundle.quantity,
  })

  return (
    <article
      aria-labelledby={`promo-bundle-${bundle.id}`}
      data-testid="promo-bundle-card"
      className={cn(
        'relative flex min-w-0 flex-col overflow-hidden border-2 border-foreground bg-card text-card-foreground',
        bundle.emphasis === 'best' && 'border-brand-600'
      )}
    >
      <div
        className={cn(
          'flex min-h-11 items-center justify-center border-b-2 border-foreground px-3 py-2 text-center font-mono text-sm font-bold uppercase tracking-wide',
          bundle.emphasis === 'good' && 'bg-gold text-black',
          bundle.emphasis === 'best' && 'border-brand-700 bg-brand-700 text-white',
          bundle.emphasis === 'default' && 'bg-foreground text-background'
        )}
      >
        {offerLabel ?? t(`${bundle.copyKey}.promo`)}
      </div>

      <div className="p-4">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2 font-mono">
              {bundle.originalTotalCents > bundle.totalCents && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatEuro(bundle.originalTotalCents)}
                </span>
              )}
              <span className="text-3xl font-bold tracking-tight">
                {formatEuro(bundle.totalCents)}
              </span>
            </div>
          </div>
          {bundle.discountPercent > 0 && (
            <span
              className={cn(
                'inline-flex min-h-11 min-w-16 items-center justify-center border-2 border-foreground px-2 font-mono text-lg font-bold',
                bundle.emphasis === 'best' ? 'bg-brand-700 text-white' : 'bg-gold text-black'
              )}
            >
              -{bundle.discountPercent}%
            </span>
          )}
        </div>

        <div className="aspect-square overflow-hidden bg-white">
          <BundleImage bundle={bundle} alt={t(`${bundle.copyKey}.imageAlt`)} />
        </div>

        <div className="mt-4 min-h-16 text-center">
          <h3 id={`promo-bundle-${bundle.id}`} className="font-mono text-xl font-bold">
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{t(`${bundle.copyKey}.tagline`)}</p>
        </div>

        <div className="mt-4 min-h-14 space-y-1 border-y border-border py-3 font-mono text-lg font-semibold">
          {bundle.freeShipping ? (
            <p className="flex items-center justify-center gap-2 text-green-700 dark:text-green-400">
              <Truck aria-hidden="true" className="size-4" />
              {t('promo.labels.freeDelivery')}
            </p>
          ) : (
            <p className="text-center text-muted-foreground">{t('promo.labels.noDiscount')}</p>
          )}
          {bundle.savingsCents !== undefined && (
            <p className="text-center font-bold text-brand-600">
              {t('promo.labels.savings', { amount: formatEuro(bundle.savingsCents) })}
            </p>
          )}
        </div>

        <Button asChild size="lg" variant="destructive" className="group mt-5 w-full">
          <a
            href={cartUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t('promo.cta')} — ${title}`}
          >
            {t('promo.cta')}
            <ArrowRight
              aria-hidden="true"
              className="transition-transform duration-200 ease-out group-hover:translate-x-1"
            />
          </a>
        </Button>
      </div>
    </article>
  )
}
