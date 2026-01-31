import { Section } from '@/components/layout'
import BannerScroller from '@/components/BannerScroller'
import { GradientMask, GRADIENT_TYPES } from '../ui/gradient-mask'

export function BannerScrollerSection() {
  return (
    <Section className="max-w-12xl mx-auto py-0">
      <GradientMask type={GRADIENT_TYPES.HORIZONTAL} edgeFade={15}>
        <BannerScroller />
      </GradientMask>
    </Section>
  )
}
