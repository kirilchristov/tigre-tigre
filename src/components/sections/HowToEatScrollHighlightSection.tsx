import { useTranslation } from 'react-i18next'
import { Section } from '@/components/layout'
import { ScrollHighlightText } from '@/components/ui/scroll-highlight-text'

export function HowToEatScrollHighlightSection() {
  const { t } = useTranslation()

  const title = t('howToHighlight.title', { defaultValue: '' })
  const paragraphs = t('howToHighlight.paragraphs', { returnObjects: true }) as string[]

  // Combine all paragraphs into a single text block with double line breaks
  const fullText = paragraphs.join('\n\n')

  return (
    <Section id="howto-highlight" className="py-24 bg-white ">
      <div className="max-w-5xl mx-auto px-6">
        {title && (
          <h2 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-black lowercase text-center">
            {title}
          </h2>
        )}
        <ScrollHighlightText
          text={fullText}
          className="font-mono text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed text-black"
        />
      </div>
    </Section>
  )
}
