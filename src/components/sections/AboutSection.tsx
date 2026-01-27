import { useTranslation } from 'react-i18next'
import { Section } from '@/components/layout'
import { useScrollReveal } from '@/hooks/useGsap'

export function AboutSection() {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <Section id="about" className="py-24 md:py-32 bg-white border-t border-border">
      <div ref={ref} className="max-w-4xl mx-auto text-center">
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-black lowercase"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          {t('about.title')}
        </h2>
        <div className="space-y-6 text-black" style={{ fontFamily: 'Arial, sans-serif' }}>
          {(t('about.paragraphs', { returnObjects: true }) as string[]).map((paragraph, index) => (
            <p
              key={index}
              className="text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed"
              style={{ whiteSpace: 'break-spaces', textAlign: 'left' }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  )
}
