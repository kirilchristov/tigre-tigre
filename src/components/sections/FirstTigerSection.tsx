import { useTranslation } from 'react-i18next'
import { Section } from '@/components/layout'
import { useScrollReveal } from '@/hooks/useGsap'
import { BrandSignature } from '../BrandSignature'

export function FirstTigerSection() {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <Section id="first-tiger" className="py-24 md:py-32 bg-white border-t border-border">
      <div ref={ref} className="max-w-5xl mx-auto text-center">
        <div className="space-y-6 text-black" style={{ fontFamily: 'Arial, sans-serif' }}>
          {(t('firstTiger.paragraphs', { returnObjects: true }) as string[]).map(
            (paragraph, index) => (
              <p
                key={index}
                className="text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed"
                style={{ whiteSpace: 'pre-line', textAlign: 'left' }}
              >
                {paragraph}
              </p>
            )
          )}
        </div>
        <BrandSignature />
      </div>
    </Section>
  )
}
