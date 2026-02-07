import { Suspense, useRef, useState, useEffect, type ReactNode } from 'react'

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
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div ref={ref}>
      {visible ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  )
}
