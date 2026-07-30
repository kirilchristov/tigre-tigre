import { Suspense, useRef, useState, useEffect, type ReactNode } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface LazySectionProps {
  children: ReactNode
  fallback?: ReactNode
  rootMargin?: string
}

export function LazySection({
  children,
  fallback = <div className="min-h-screen" />,
  rootMargin = '200px',
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Load immediately if user navigated to a hash anchor
    if (window.location.hash) {
      const frame = window.requestAnimationFrame(() => setVisible(true))
      return () => window.cancelAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(el)

    // Load when user clicks any anchor link
    const onHashChange = () => setVisible(true)
    window.addEventListener('hashchange', onHashChange)

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [rootMargin])

  // ponytail: debounced resize refresh — waits for layout to settle before recalculating ScrollTrigger
  useEffect(() => {
    if (!visible) return
    const el = ref.current
    if (!el) return
    let timer: ReturnType<typeof setTimeout>
    const ro = new ResizeObserver(() => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        ScrollTrigger.refresh()
        ro.disconnect()
      }, 300)
    })
    ro.observe(el)
    return () => {
      clearTimeout(timer)
      ro.disconnect()
    }
  }, [visible])

  return (
    <div ref={ref}>
      {visible ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  )
}
