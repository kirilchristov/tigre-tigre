import { useTranslation } from 'react-i18next'
import { Section } from '@/components/layout'
import { useScrollReveal } from '@/hooks/useGsap'
import { BrandSignature } from './BrandSignature'

interface ParagraphSectionProps {
  /** Translation key for the section (e.g., 'about', 'howto') */
  translationKey: string
  /** Optional section ID for anchor links */
  id?: string
  /** Show the brand signature at the bottom */
  showSignature?: boolean
  /** Custom className for the section */
  className?: string
}

/**
 * Reusable section component for displaying title + paragraphs + optional brand signature.
 * Used for About, HowToEat, FirstTiger sections.
 */
export function ParagraphSection({
  translationKey,
  id,
  showSignature = false,
  className = 'py-16 bg-white',
}: ParagraphSectionProps) {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLDivElement>()

  const title = t(`${translationKey}.title`, { defaultValue: '' })
  const paragraphs = t(`${translationKey}.paragraphs`, { returnObjects: true }) as string[]

  return (
    <Section id={id} className={className}>
      <div ref={ref} className="max-w-4xl mx-auto text-center">
        {title && (
          <h2
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-12 text-black lowercase"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            {title}
          </h2>
        )}
        <div className="space-y-6 text-black" style={{ fontFamily: 'Arial, sans-serif' }}>
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold leading-relaxed"
              style={{ whiteSpace: 'break-spaces', textAlign: 'left' }}
            >
              {paragraph}
            </p>
          ))}
        </div>
        {showSignature && <BrandSignature className="mt-12" />}
      </div>
    </Section>
  )
}
