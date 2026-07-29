import { Check, Flame } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface BenefitPanelProps {
  readonly title: string
  readonly label: string
  readonly receivesLabel: string
  readonly items: readonly string[]
  readonly best?: boolean
}

function BenefitPanel({ title, label, receivesLabel, items, best = false }: BenefitPanelProps) {
  return (
    <article className="overflow-hidden border-2 border-foreground bg-card">
      <p
        className={`border-b-2 border-foreground px-4 py-3 text-center font-mono text-lg font-bold uppercase ${
          best ? 'bg-brand-700 text-white' : 'bg-gold text-black'
        }`}
      >
        {label}
      </p>
      <div className="p-6 sm:p-8">
        <h3 className="font-mono text-2xl font-black uppercase sm:text-3xl">{title}</h3>
        <p className="mt-5 font-mono text-sm font-bold">{receivesLabel}</p>
        <ul className="mt-3 space-y-4">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 font-mono font-semibold">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center border border-foreground">
                <Check aria-hidden="true" className="size-4 text-brand-600" strokeWidth={3} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function PromoBenefits() {
  const { t } = useTranslation()
  const duoItems = t('promo.benefits.duo.items', { returnObjects: true }) as string[]
  const sixItems = t('promo.benefits.six.items', { returnObjects: true }) as string[]

  return (
    <>
      <section aria-labelledby="promo-benefits-title">
        <h2 id="promo-benefits-title" className="sr-only">
          {t('promo.benefits.title')}
        </h2>
        <div className="grid gap-5 lg:grid-cols-2">
          <BenefitPanel
            label={t('promo.labels.goodOffer')}
            title={t('promo.benefits.duo.title')}
            receivesLabel={t('promo.benefits.receives')}
            items={duoItems}
          />
          <BenefitPanel
            label={t('promo.labels.bestOffer')}
            title={t('promo.benefits.six.title')}
            receivesLabel={t('promo.benefits.receives')}
            items={sixItems}
            best
          />
        </div>
      </section>

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
    </>
  )
}
