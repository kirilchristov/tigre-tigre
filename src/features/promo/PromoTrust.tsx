import { Flame } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function PromoTrust() {
  const { t } = useTranslation()

  return (
    <section className="grid items-center gap-8 border-2 border-foreground p-6 sm:p-8 md:grid-cols-[1fr_auto]">
      <p className="text-center font-mono text-4xl font-black tracking-tight sm:text-5xl md:text-left">
        {t('promo.trust.statement')}
      </p>
      <div className="text-center">
        <div
          className="flex justify-center gap-2"
          role="img"
          aria-label={t('promo.trust.heatAccessibleLabel')}
        >
          {Array.from({ length: 5 }, (_, index) => (
            <Flame
              key={index}
              aria-hidden="true"
              className={index < 2 ? 'text-brand-600' : 'text-muted-foreground/35'}
              fill={index < 2 ? 'currentColor' : 'none'}
              size={34}
            />
          ))}
        </div>
        <p className="mt-2 font-mono text-sm font-bold uppercase tracking-[0.22em]">
          {t('promo.trust.heatLabel')}
        </p>
      </div>
    </section>
  )
}
