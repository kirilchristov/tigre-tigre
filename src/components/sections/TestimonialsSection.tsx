import { useTranslation } from 'react-i18next'
import { Section } from '@/components/layout'

type QuoteTile = { type: 'quote'; stars: number; quote: string; author: string }
type StatTile = { type: 'stat'; headline: string; subtext: string }
type Tile = QuoteTile | StatTile

const TILE_STYLES = [
  { bgClass: 'bg-blue-950', dark: true },
  { bgClass: 'bg-red-500', dark: true },
  { bgClass: 'bg-white', dark: false },
  { bgClass: 'bg-red-500', dark: true },
  { bgClass: 'bg-amber-500', dark: true },
  { bgClass: 'bg-blue-950', dark: true },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5 mb-3">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`text-xl leading-none ${i < count ? 'opacity-100' : 'opacity-25'}`}
        >
          ★
        </span>
      ))}
      <span className="ml-1 text-sm opacity-70">{count}/5</span>
    </div>
  )
}

export function TestimonialsSection() {
  const { t } = useTranslation()
  const items = t('testimonials.items', { returnObjects: true }) as Tile[]

  return (
    <Section id="testimonials" className="py-16 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-foreground lowercase text-center">
          {t('testimonials.title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((tile, i) => {
            const { bgClass, dark } = TILE_STYLES[i] ?? TILE_STYLES[0]
            return (
              <div
                key={i}
                className={`p-6 flex flex-col sm:aspect-[4/5] ${bgClass} ${dark ? 'text-white' : 'text-black border border-gray-200'}`}
              >
                <div className="flex-1">
                  {tile.type === 'quote' ? (
                    <>
                      <StarRating count={tile.stars} />
                      <p className="font-sans italic font-bold text-xl sm:text-lg leading-snug mb-3">
                        {tile.quote}
                      </p>
                      <p className="font-sans text-sm opacity-60">— {tile.author}</p>
                    </>
                  ) : (
                    <>
                      <p className="font-sans italic font-bold text-xl sm:text-lg leading-snug mb-3">
                        {tile.headline}
                      </p>
                      <p className="font-sans text-sm opacity-60">{tile.subtext}</p>
                    </>
                  )}
                </div>
                <div className="mt-8">
                  <p className="font-sans font-bold text-xl">tigre tigre</p>
                  <p className="font-sans text-sm opacity-60">{t('tagline')}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
