import { Section } from '@/components/layout'
import TextScroller from '@/components/TextScroller'

interface TextScrollerSectionProps {
  texts: string[]
  speed?: number
  direction?: 'left' | 'right'
  gradient?: boolean
  gradientColor?: string
  pauseOnHover?: boolean
  className?: string
  textClassName?: string
}

export function TextScrollerSection(props: TextScrollerSectionProps) {
  return (
    <Section className="py-0">
      <TextScroller {...props} />
    </Section>
  )
}
