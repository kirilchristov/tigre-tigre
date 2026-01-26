import { useTranslation } from 'react-i18next'
import { Section } from '@/components/layout'
import { useScrollReveal } from '@/hooks/useGsap'

export function AboutSection() {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <Section id="about" className="py-24 md:py-32 text-center border-t border-border">
      <div ref={ref}>
        <h2 className="text-4xl md:text-6xl font-bold mb-6">{t('about.title')}</h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">{t('about.description')}</p>
      </div>
    </Section>
  )
}
