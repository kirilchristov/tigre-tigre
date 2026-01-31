import { useTranslation } from 'react-i18next'
import { Section } from '@/components/layout'
import { useScrollReveal } from '@/hooks/useGsap'
import { env } from '@/lib/env'

export function ContactSection() {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLDivElement>()
  const email = env.contact.email

  return (
    <Section id="contact" className="py-16 text-center border-t border-border bg-muted/30">
      <div ref={ref}>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('contact.title')}</h2>
        <p className="text-lg text-muted-foreground mb-4">{t('contact.description')}</p>
        <a
          href={`mailto:${email}`}
          className="text-xl font-medium hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground rounded"
          aria-label={`Send email to ${email}`}
        >
          {email}
        </a>
      </div>
    </Section>
  )
}
