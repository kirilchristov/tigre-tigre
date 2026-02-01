import { useTranslation } from 'react-i18next'
import { Section } from '@/components/layout'
import { ScrollHighlightText } from '@/components/ui/scroll-highlight-text'
import { BrandSignature } from '../BrandSignature'

export function FirstTigerScrollHighlightSection() {
  const { t } = useTranslation()

  const paragraphs = t('firstTigerHighlight.paragraphs', { returnObjects: true }) as string[]

  // Combine all paragraphs into a single text block with double line breaks
  const fullText = paragraphs.join('\n\n')

  return (
    <Section id="first-tiger-highlight" className="py-24 bg-white ">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollHighlightText
          text={fullText}
          className="font-mono text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed text-black"
        />
        <div className="mt-16">
          <BrandSignature />
        </div>
      </div>
    </Section>
  )
}
