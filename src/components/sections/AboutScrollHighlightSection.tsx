import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Section } from '@/components/layout'
import { ScrollHighlightText } from '@/components/ui/scroll-highlight-text'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { ColoredOverlay } from '@/components/ui/colored-gradient-overlay'

interface AboutScrollHighlightSectionProps {
  footer?: ReactNode
}

/**
 * About section with scroll-triggered text highlighting over a fixed hero image.
 * The background image stays static while the user scrolls.
 * A colored overlay ensures text readability in both light and dark theme.
 */
export function AboutScrollHighlightSection({ footer }: AboutScrollHighlightSectionProps) {
  const { t } = useTranslation()

  const title = t('aboutHighlight.title', { defaultValue: '' })
  const paragraphs = t('aboutHighlight.paragraphs', { returnObjects: true }) as string[]
  const fullText = paragraphs.join('\n\n')

  return (
    <Section id="about-highlight" className="relative [clip-path:inset(0)] py-16" fullWidth>
      {/* Fixed background image — stays in place while content scrolls over it */}
      <div className="fixed inset-0 -z-10 h-screen w-full">
        <ColoredOverlay color="hsl(var(--background))" opacity={0.7} className="h-full w-full">
          <ImageWithFallback
            src="/images/hero-lg.webp"
            fallbackSrc="/images/hero-lg.jpg"
            alt="tigre tigre hero"
            sources={[
              { srcSet: '/images/hero-sm.webp', media: '(max-width: 640px)', type: 'image/webp' },
              { srcSet: '/images/hero-md.webp', media: '(max-width: 1024px)', type: 'image/webp' },
              { srcSet: '/images/hero-lg.webp', media: '(min-width: 1025px)', type: 'image/webp' },
            ]}
            className="h-full w-full object-cover"
            containerClassName="h-full w-full"
            showErrorMessage={false}
          />
        </ColoredOverlay>
      </div>

      {/* Scrollable text content */}
      <div className="relative z-10 py-24">
        <div className="max-w-5xl mx-auto px-4">
          {title && (
            <h2 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-[hsl(var(--about-text))] lowercase text-center">
              {title}
            </h2>
          )}
          <ScrollHighlightText
            text={fullText}
            className="font-mono text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed text-[hsl(var(--about-text))]"
          />
        </div>
      </div>
      {footer}
    </Section>
  )
}
