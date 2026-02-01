import { useRef, useEffect, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HighlightMarker, HighlightCircle, HighlightUnderline } from './highlight-svgs'

gsap.registerPlugin(ScrollTrigger)

export type HighlightType = 'marker' | 'circle' | 'underline'

interface ScrollHighlightTextProps {
  /**
   * The text content with inline markup for highlights.
   * Supported tags: [marker]text[/marker], [circle]text[/circle], [underline]text[/underline]
   * Example: "[marker]tigre tigre[/marker] is for when there's no one to [underline]impress[/underline]."
   */
  text: string
  /** Additional className for the container */
  className?: string
}

type ParsedSegment =
  | { type: 'text'; content: string }
  | { type: 'highlight'; content: string; highlightType: HighlightType }
  | { type: 'break' }

/**
 * A component that displays text with word-level scroll-triggered highlighting.
 * Words fade in from low opacity as user scrolls, with emphasis words getting
 * different SVG highlight styles (marker, circle, or underline).
 *
 * Use inline markup: [marker]word[/marker], [circle]word[/circle], [underline]word[/underline]
 */
export function ScrollHighlightText({ text, className = '' }: ScrollHighlightTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<HTMLSpanElement[]>([])
  const svgRefs = useRef<SVGSVGElement[]>([])

  // Parse text with markup into segments
  const parsedContent = useMemo(() => {
    const result: ParsedSegment[] = []

    // Split by newlines first
    const lines = text.split('\n')

    lines.forEach((line, lineIndex) => {
      // Regex to match [marker]...[/marker], [circle]...[/circle], [underline]...[/underline]
      const tagRegex = /\[(marker|circle|underline)\](.*?)\[\/\1\]/g

      let lastIndex = 0
      let match

      while ((match = tagRegex.exec(line)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          const beforeText = line.slice(lastIndex, match.index)
          if (beforeText) {
            result.push({ type: 'text', content: beforeText })
          }
        }

        // Add the highlighted segment
        const highlightType = match[1] as HighlightType
        const highlightedText = match[2]
        result.push({ type: 'highlight', content: highlightedText, highlightType })

        lastIndex = match.index + match[0].length
      }

      // Add remaining text after last match
      if (lastIndex < line.length) {
        result.push({ type: 'text', content: line.slice(lastIndex) })
      }

      // Add line break after each line except the last
      if (lineIndex < lines.length - 1) {
        result.push({ type: 'break' })
      }
    })

    return result
  }, [text])

  useEffect(() => {
    const container = containerRef.current
    const words = wordsRef.current.filter(Boolean)
    const svgs = svgRefs.current.filter(Boolean)

    if (!container || words.length === 0) return

    const ctx = gsap.context(() => {
      // Create main timeline for scroll-based animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      })

      // Animate words to full opacity
      tl.to(words, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.015,
      })

      // Animate SVG highlights with strokeDashoffset
      if (svgs.length > 0) {
        svgs.forEach((svg) => {
          const path = svg.querySelector('path')
          if (path) {
            // Calculate when this SVG should animate based on its position
            const wordIndex = parseInt(svg.dataset.wordIndex || '0', 10)
            const progress = wordIndex / words.length

            tl.to(
              svg,
              {
                opacity: 1,
                duration: 0.1,
              },
              progress
            )

            tl.to(
              path,
              {
                strokeDashoffset: 0,
                duration: 0.2,
                ease: 'power2.out',
              },
              progress
            )
          }
        })
      }
    })

    return () => {
      ctx.revert()
    }
  }, [parsedContent])

  // Reset refs array when content changes
  wordsRef.current = []
  svgRefs.current = []

  const renderHighlightSVG = (type: HighlightType, wordIndex: number, content: string) => {
    const baseClass = 'absolute text-red-500 pointer-events-none left-0'
    // Calculate width based on character count (approximate 0.6em per character)
    const charCount = content.length
    const width = `${Math.max(charCount * 0.6, 2)}em`

    switch (type) {
      case 'marker':
        return (
          <HighlightMarker
            ref={(el) => {
              if (el) svgRefs.current.push(el)
            }}
            data-word-index={wordIndex}
            className={`${baseClass} top-[0.1em] mix-blend-multiply`}
            style={{ width, height: '1.2em' }}
          />
        )
      case 'circle':
        return (
          <HighlightCircle
            ref={(el) => {
              if (el) svgRefs.current.push(el)
            }}
            data-word-index={wordIndex}
            className={`${baseClass} bottom-0`}
            style={{ width }}
          />
        )
      case 'underline':
        return (
          <HighlightUnderline
            ref={(el) => {
              if (el) svgRefs.current.push(el)
            }}
            data-word-index={wordIndex}
            className={`${baseClass} bottom-0`}
            style={{ width }}
          />
        )
      default:
        return null
    }
  }

  // Render words from a text string, splitting by spaces
  const renderWords = (content: string) => {
    const words = content.split(/(\s+)/)
    return words.map((word, i) => {
      // Preserve whitespace
      if (/^\s+$/.test(word)) {
        return <span key={`space-${i}`}>{word}</span>
      }
      if (!word) return null

      return (
        <span
          key={`word-${i}`}
          ref={(el) => {
            if (el) wordsRef.current.push(el)
          }}
          className="inline"
          style={{ opacity: 0.15 }}
        >
          {word}
        </span>
      )
    })
  }

  // Render highlighted phrase with SVG wrapper
  const renderHighlightedPhrase = (
    content: string,
    highlightType: HighlightType,
    segmentIndex: number
  ) => {
    const firstWordIndex = wordsRef.current.length
    const words = content.split(/(\s+)/)

    return (
      <span key={`highlight-${segmentIndex}`} className="relative inline-block whitespace-nowrap">
        {renderHighlightSVG(highlightType, firstWordIndex, content)}
        <span className="relative z-10">
          {words.map((word, i) => {
            if (/^\s+$/.test(word)) {
              return <span key={`space-${i}`}>{word}</span>
            }
            if (!word) return null

            return (
              <span
                key={`word-${i}`}
                ref={(el) => {
                  if (el) wordsRef.current.push(el)
                }}
                className="inline"
                style={{ opacity: 0.15 }}
              >
                {word}
              </span>
            )
          })}
        </span>
      </span>
    )
  }

  return (
    <div ref={containerRef} className={className}>
      {parsedContent.map((segment, index) => {
        if (segment.type === 'break') {
          return <br key={`br-${index}`} />
        }

        if (segment.type === 'highlight') {
          return renderHighlightedPhrase(segment.content, segment.highlightType, index)
        }

        // Regular text
        return <span key={`text-${index}`}>{renderWords(segment.content)}</span>
      })}
    </div>
  )
}
