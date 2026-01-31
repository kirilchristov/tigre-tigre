import { Section } from '@/components/layout'
import TextScroller from '@/components/TextScroller'
import { useTranslation } from 'react-i18next'

export function SubHeroTextRollerSection() {
  const { t } = useTranslation()
  const tagline = t('hero.tagline')
  const title = t('hero.title')

  return (
    <Section className="py-0">
      <TextScroller
        texts={Array(3).fill(`${tagline}  •  ${title}`)}
        speed={40}
        direction="left"
        pauseOnHover={true}
        textClassName="text-3xl font-black text-brand-600"
      />
    </Section>
  )
}
