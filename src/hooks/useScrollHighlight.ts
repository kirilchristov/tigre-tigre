import { useEffect, useRef, RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface UseScrollHighlightOptions {
  /** Starting opacity for words (default: 0.15) */
  startOpacity?: number
  /** Ending opacity for words (default: 1) */
  endOpacity?: number
  /** Stagger delay between words (default: 0.02) */
  stagger?: number
  /** ScrollTrigger start position (default: 'top 80%') */
  start?: string
  /** ScrollTrigger end position (default: 'bottom 20%') */
  end?: string
  /** Scrub value for smooth scroll-linked animation (default: 1) */
  scrub?: number | boolean
}

/**
 * Hook for creating scroll-triggered word highlight animations.
 * Returns a ref to attach to the container element.
 * Child elements with data-word attribute will be animated.
 */
export function useScrollHighlight<T extends HTMLElement>(
  options: UseScrollHighlightOptions = {}
): RefObject<T | null> {
  const {
    startOpacity = 0.15,
    endOpacity = 1,
    stagger = 0.02,
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = 1,
  } = options

  const containerRef = useRef<T>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Find all word spans within the container
    const words = container.querySelectorAll('[data-word]')
    if (words.length === 0) return

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(words, { opacity: startOpacity })

      // Animate on scroll
      gsap.to(words, {
        opacity: endOpacity,
        duration: 0.3,
        ease: 'power2.out',
        stagger,
        scrollTrigger: {
          trigger: container,
          start,
          end,
          scrub,
        },
      })
    })

    return () => {
      ctx.revert()
    }
  }, [startOpacity, endOpacity, stagger, start, end, scrub])

  return containerRef
}
