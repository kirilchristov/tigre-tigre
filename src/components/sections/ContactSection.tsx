import { useTranslation } from 'react-i18next'
import { Section } from '@/components/layout'
import { useScrollReveal } from '@/hooks/useGsap'
import { env } from '@/lib/env'

const SOCIAL_HANDLE = 'eat.tigretigre'

export function ContactSection() {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLDivElement>()
  const email = env.contact.email

  return (
    <Section id="contact" className="py-8 px-4 text-center border-t border-border bg-muted/30">
      <div ref={ref} className="font-mono space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 lowercase">{t('contact.title')}</h2>
        <p className="text-lg text-muted-foreground">{t('contact.description')}</p>

        <div className="flex flex-col items-center gap-4">
          <a
            href={`mailto:${email}`}
            className="text-base sm:text-xl font-medium hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground rounded-[2px] break-words"
            aria-label={`Send email to ${email}`}
          >
            {email}
          </a>

          <div className="flex items-center gap-6 text-base sm:text-lg">
            <a
              href={`https://instagram.com/${SOCIAL_HANDLE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground rounded-[2px]"
            >
              instagram
            </a>
            <a
              href={`https://tiktok.com/@${SOCIAL_HANDLE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground rounded-[2px]"
            >
              tiktok
            </a>
          </div>
          <div className="pt-8">
            <a
              href="https://tally.so/r/rjPzAl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base sm:text-lg font-medium text-gold hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground rounded-[2px]"
            >
              {t('contact.questionnaire')}
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}
