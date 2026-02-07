import { Section } from '@/components/layout'
import TextScroller from '@/components/TextScroller'
import { useTranslation } from 'react-i18next'

export function SubHeroTextRollerSection() {
  const { t } = useTranslation()
  const tagline = t('hero.tagline')

  return (
    <Section className="py-0">
      <TextScroller
        texts={Array(33).fill(`${tagline}`)}
        duration={80}
        direction="left"
        pauseOnHover={false}
        textClassName="text-3xl font-black text-brand-600"
      />
    </Section>
  )
}
