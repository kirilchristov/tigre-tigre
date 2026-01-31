import { Section } from '@/components/layout'
import TextScroller from '@/components/TextScroller'
import { useTranslation } from 'react-i18next'

export function SubHeroTextRollerSection() {
  const { t } = useTranslation()
  const tagline = t('hero.tagline')

  return (
    <Section className="py-0">
      <TextScroller
        texts={Array(5).fill(tagline)}
        speed={40}
        direction="left"
        pauseOnHover
        textClassName="text-6xl font-black text-red-600"
      />
    </Section>
  )
}
