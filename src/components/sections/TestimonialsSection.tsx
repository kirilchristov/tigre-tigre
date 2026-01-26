import { useTranslation } from 'react-i18next'
import { Section } from '@/components/layout'
import { useScrollReveal, useStaggerReveal } from '@/hooks/useGsap'

const testimonialKeys = ['one', 'two', 'three'] as const

export function TestimonialsSection() {
  const { t } = useTranslation()
  const titleRef = useScrollReveal<HTMLHeadingElement>()
  const gridRef = useStaggerReveal<HTMLDivElement>()

  return (
    <Section className="py-24 md:py-32 border-t border-border bg-muted/30">
      <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-center mb-16">
        {t('testimonials.title')}
      </h2>
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonialKeys.map((key) => (
          <div key={key} className="bg-background p-8 border border-border">
            <p className="text-lg mb-6 italic">"{t(`testimonials.items.${key}.quote`)}"</p>
            <p className="font-bold">— {t(`testimonials.items.${key}.author`)}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
