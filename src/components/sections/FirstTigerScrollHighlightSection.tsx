import { useTranslation } from 'react-i18next'
import { Section } from '@/components/layout'
import { ScrollHighlightText } from '@/components/ui/scroll-highlight-text'

export function FirstTigerScrollHighlightSection() {
  const { t } = useTranslation()

  const paragraphs = t('firstTigerHighlight.paragraphs', { returnObjects: true }) as string[]

  // Combine all paragraphs into a single text block with double line breaks
  const fullText = paragraphs.join('\n\n')

  return (
    <Section id="first-tiger-highlight" className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        <ScrollHighlightText
          text={fullText}
          className="font-mono text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed text-foreground"
        />
      </div>
    </Section>
  )
}
