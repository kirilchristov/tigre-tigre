import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Flame } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TOTAL = 5
const FILLED = 2

// Flame path from lucide-react (viewBox 0 0 24 24)
const FLAME_PATH = 'M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4'

export function HeatIndicator() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const rectRefs = useRef<SVGRectElement[]>([])

  rectRefs.current = []

  useEffect(() => {
    const container = containerRef.current
    const rects = rectRefs.current.filter(Boolean)
    if (!container || rects.length === 0) return

    const ctx = gsap.context(() => {
      gsap.set(rects, { attr: { y: 24, height: 0 } })
      gsap.to(rects, {
        attr: { y: 0, height: 24 },
        duration: 0.15,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          end: 'top 60%',
          scrub: 0.3,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-4 py-12">
      <div className="flex gap-4 items-end">
        {Array.from({ length: TOTAL }, (_, i) => (
          <div key={i} className="relative w-8 h-8">
            <Flame
              className={i < FILLED ? 'text-red-500' : 'text-foreground/20'}
              size={32}
              strokeWidth={1.5}
              fill="none"
            />
            {i < FILLED && (
              <svg
                viewBox="0 0 24 24"
                className="absolute inset-0 w-8 h-8 text-red-500 pointer-events-none"
              >
                <defs>
                  <clipPath id={`flame-fill-${i}`}>
                    <rect
                      ref={(el) => {
                        if (el) rectRefs.current.push(el)
                      }}
                      x="0"
                      y="24"
                      width="24"
                      height="0"
                    />
                  </clipPath>
                </defs>
                <path
                  d={FLAME_PATH}
                  fill="currentColor"
                  clipPath={`url(#flame-fill-${i})`}
                />
              </svg>
            )}
          </div>
        ))}
      </div>
      <span className="font-mono text-xs tracking-[0.3em] uppercase text-foreground/40">
        {t('heatIndicator.label')}
      </span>
    </div>
  )
}
