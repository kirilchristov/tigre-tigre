import { useTranslation } from 'react-i18next'
import { Section } from '@/components/layout'
import { useScrollReveal, useStaggerReveal } from '@/hooks/useGsap'

const featureKeys = ['crispy', 'spicy', 'natural', 'versatile'] as const

export function FeaturesSection() {
  const { t } = useTranslation()
  const titleRef = useScrollReveal<HTMLHeadingElement>()
  const gridRef = useStaggerReveal<HTMLDivElement>()

  return (
    <Section className="py-16">
      <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-center mb-16">
        {t('features.title')}
      </h2>
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featureKeys.map((key) => (
          <div key={key} className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 border-2 border-foreground rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">{key[0].toUpperCase()}</span>
            </div>
            <h3 className="text-xl font-bold mb-3">{t(`features.items.${key}.title`)}</h3>
            <p className="text-muted-foreground">{t(`features.items.${key}.description`)}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
