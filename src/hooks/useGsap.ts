import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 115%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
          },
        }
      )
    })

    return () => {
      ctx.revert() // Properly cleanup all animations and ScrollTriggers in this context
    }
  }, [])

  return ref
}
