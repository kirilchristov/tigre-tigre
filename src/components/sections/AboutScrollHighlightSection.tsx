import { useTranslation } from 'react-i18next'
import { Section } from '@/components/layout'
import { ScrollHighlightText } from '@/components/ui/scroll-highlight-text'

/**
 * Experimental About section with scroll-triggered text highlighting.
 * Uses Geist Mono font with word-level opacity animation on scroll.
 * Key phrases get different SVG highlight styles using inline markup:
 * [marker]text[/marker], [circle]text[/circle], [underline]text[/underline]
 */
export function AboutScrollHighlightSection() {
  const { t } = useTranslation()

  const title = t('aboutHighlight.title', { defaultValue: '' })
  const paragraphs = t('aboutHighlight.paragraphs', { returnObjects: true }) as string[]

  // Combine all paragraphs into a single text block with double line breaks between them
  const fullText = paragraphs.join('\n\n')

  return (
    <Section id="about-highlight" className="py-24 bg-white min-h-[150vh]">
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
