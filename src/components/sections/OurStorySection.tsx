import { useTranslation } from 'react-i18next'
import { Section } from '@/components/layout'

export function OurStorySection() {
  const { t } = useTranslation()

  const title = t('ourStory.title', { defaultValue: '' })
  const paragraphs = t('ourStory.paragraphs', { returnObjects: true }) as string[]

  return (
    <Section id="our-story" fullWidth>
      <div className="lg:grid lg:grid-cols-2">
        {/* Sticky image column — portrait photo pins while text scrolls */}
        <div className="lg:sticky lg:top-0 lg:h-screen overflow-hidden">
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet="/images/story/story-1440x2160.webp"
              type="image/webp"
            />
            <source
              media="(min-width: 640px)"
              srcSet="/images/story/story-1080x1620.webp"
              type="image/webp"
            />
            <img
              src="/images/story/story-640x960.webp"
              alt="tigre tigre chili crunch being poured on bread"
              className="w-full h-full object-cover object-center aspect-[2/3] lg:aspect-auto"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>

        {/* Scrolling text column */}
        <div className="px-8 py-16 md:px-12 lg:px-16 lg:py-24 flex flex-col justify-start bg-background">
          {title && (
            <h2 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-foreground lowercase">
              {title}
            </h2>
          )}
          <div className="space-y-6">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="font-mono text-base md:text-lg leading-relaxed text-foreground whitespace-pre-line"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
