import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useScrollReveal } from '@/hooks/useGsap'

const STORE_HREF = 'https://shop.tigre-tigre.com'

interface ProductCTAProps {
  className?: string
  compact?: boolean
}

export function ProductCTA({ className, compact = false }: ProductCTAProps) {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div ref={ref} className={cn('w-full max-w-md mx-auto my-4 px-4 font-mono', className)}>
      <div className={cn('relative border-t-2 border-foreground bg-muted/30 transition-all', compact ? 'p-4' : 'p-6')}>
<div className="space-y-4">
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

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>{t('productCTA.trustSignal')}</p>
      </div>
    </div>
  )
}
