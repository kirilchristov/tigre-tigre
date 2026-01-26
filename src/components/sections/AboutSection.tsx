import { useTranslation } from 'react-i18next'
import { Section } from '@/components/layout'

export function AboutSection() {
  const { t } = useTranslation()

  return (
    <Section id="about" className="py-24 md:py-32 text-center border-t border-border">
      <h2 className="text-4xl md:text-6xl font-bold mb-6">{t('about.title')}</h2>
      <p className="max-w-2xl mx-auto text-lg text-muted-foreground">{t('about.description')}</p>
    </Section>
  )
}
