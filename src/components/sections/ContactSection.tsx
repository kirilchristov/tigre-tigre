import { useTranslation } from 'react-i18next'
import { Section } from '@/components/layout'
import { useScrollReveal } from '@/hooks/useGsap'

export function ContactSection() {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <Section id="contact" className="py-24 md:py-32 text-center border-t border-border">
      <div ref={ref}>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('contact.title')}</h2>
        <p className="text-lg text-muted-foreground mb-4">{t('contact.description')}</p>
        <a
          href={`mailto:${t('contact.email')}`}
          className="text-xl font-medium hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground rounded"
          aria-label={`Send email to ${t('contact.email')}`}
        >
          {t('contact.email')}
        </a>
      </div>
    </Section>
  )
}
