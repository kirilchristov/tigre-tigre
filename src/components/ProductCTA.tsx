import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useScrollReveal } from '@/hooks/useGsap'

const SINGLE_HREF = 'https://shop.tigre-tigre.com/cart/56986218955100:1'
const STORE_HREF = 'https://shop.tigre-tigre.com'

interface ProductCTAProps {
  className?: string
  compact?: boolean
}

export function ProductCTA({ className, compact = false }: ProductCTAProps) {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div ref={ref} className={cn('w-full max-w-4xl mx-auto my-4 px-4 font-mono', className)}>
      <div
        className={cn(
          'grid gap-4',
          compact ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 md:grid-cols-2'
        )}
      >
        {/* Single Jar */}
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
              <span className={cn('font-bold text-foreground', compact ? 'text-2xl' : 'text-3xl')}>
                {t('productCTA.single.price')}
              </span>
              <p className="text-sm text-muted-foreground mt-1">
                {t('productCTA.single.shipping')}
              </p>
            </div>
            <Button
              asChild
              variant="ctaSecondary"
              size={compact ? 'default' : 'lg'}
              className="w-full"
            >
              <a href={SINGLE_HREF} target="_blank" rel="noopener noreferrer">
                {t('productCTA.single.button')}
              </a>
            </Button>
          </div>
        </div>

        {/* Buy More (emphasized) */}
        <div
          className={cn(
            'relative border-t-2 border-foreground bg-muted/30 transition-all',
            compact ? 'p-4' : 'p-6'
          )}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-foreground text-background text-xs font-bold px-3 py-1 uppercase tracking-wide">
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
              <span className={cn('font-bold text-foreground', compact ? 'text-2xl' : 'text-3xl')}>
                {t('productCTA.multiple.price')}
              </span>
              <p className="text-sm font-bold text-green-600 mt-1">
                {t('productCTA.multiple.shipping')}
              </p>
            </div>
            <Button
              asChild
              variant="ctaPrimary"
              size={compact ? 'default' : 'lg'}
              className="w-full"
            >
              <a href={STORE_HREF} target="_blank" rel="noopener noreferrer">
                {t('productCTA.multiple.button')}
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>{t('productCTA.trustSignal')}</p>
      </div>
    </div>
  )
}
