import { useRef, useEffect, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HighlightMarker, HighlightCircle, HighlightUnderline } from './highlight-svgs'

gsap.registerPlugin(ScrollTrigger)

export type HighlightType = 'marker' | 'circle' | 'underline'

interface ScrollHighlightTextProps {
  /**
   * The text content with inline markup for highlights.
   * Supported tags: [marker]text[/marker], [circle]text[/circle], [underline]text[/underline], [link:url]text[/link], [brand]text[/brand]
   * Example: "[marker][brand]tigre tigre[/brand][/marker] is for when there's no one to [underline]impress[/underline]."
   */
  text: string
  /** Additional className for the container */
  className?: string
}

type ParsedSegment =
  | { type: 'text'; content: string }
  | { type: 'highlight'; content: string; highlightType: HighlightType }
  | { type: 'link'; content: string; url: string } // 'It leads you to a [link:https://forms.google.com/feedback]feedback form[/link], because...'
  | { type: 'brand'; content: string }
  | { type: 'break' }

/**
 * A component that displays text with word-level scroll-triggered highlighting.
 * Words fade in from low opacity as user scrolls, with emphasis words getting
 * different SVG highlight styles (marker, circle, or underline).
 *
 * Use inline markup: [marker]word[/marker], [circle]word[/circle], [underline]word[/underline], [link:url]text[/link], [brand]text[/brand]
 */
export function ScrollHighlightText({ text, className = '' }: ScrollHighlightTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef(new Map<string, HTMLSpanElement>())
  const svgRefs = useRef(new Map<string, SVGSVGElement>())

  // Parse text with markup into segments
  const parsedContent = useMemo(() => {
    const result: ParsedSegment[] = []

    // Split by newlines first
    const lines = text.split('\n')

    lines.forEach((line, lineIndex) => {
      // Regex to match [marker]...[/marker], [circle]...[/circle], [underline]...[/underline], [link:url]...[/link], [brand]...[/brand]
      const tagRegex =
        /\[(marker|circle|underline)\](.*?)\[\/\1\]|\[link:(.*?)\](.*?)\[\/link\]|\[brand\](.*?)\[\/brand\]/g

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

        // Check if it's a link, brand, or highlight
        if (match[5] !== undefined) {
          // It's a brand: [brand]text[/brand]
          result.push({ type: 'brand', content: match[5] })
        } else if (match[3] !== undefined) {
          // It's a link: [link:url]text[/link]
          const url = match[3]
          const linkText = match[4]
          result.push({ type: 'link', content: linkText, url })
        } else {
          // It's a highlight: [marker/circle/underline]text[/marker/circle/underline]
          const highlightType = match[1] as HighlightType
          const highlightedText = match[2]
          result.push({ type: 'highlight', content: highlightedText, highlightType })
        }

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
    const words = Array.from(wordsRef.current.values())
    const svgs = Array.from(svgRefs.current.values())

    if (!container || words.length === 0) return

    const ctx = gsap.context(() => {
      // Create main timeline for scroll-based animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 115%',
          end: 'bottom 20%',
          scrub: 0.5,
        },
      })

      // Animate all words to full opacity at once
      tl.to(words, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      })

      // Animate SVG highlights with strokeDashoffset
      // Animate them sequentially based on their order, spread across the scroll
      if (svgs.length > 0) {
        svgs.forEach((svg, svgIndex) => {
          const path = svg.querySelector('path')
          if (path) {
            // Calculate actual path length for proper draw animation
            const pathLength = path.getTotalLength()

            // Set initial state for drawing effect
            gsap.set(path, {
              strokeDasharray: pathLength,
              strokeDashoffset: pathLength,
            })

            // Spread SVGs evenly across the timeline, starting at 20% and ending at 70%
            const startOffset = 0.3
            const endOffset = 0.95
            const range = endOffset - startOffset
            const progress = startOffset + (svgIndex / Math.max(svgs.length - 1, 1)) * range

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
                duration: 0.4,
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

  const renderHighlightSVG = (type: HighlightType, segmentIndex: number, content: string) => {
    const baseClass = 'absolute text-red-500 pointer-events-none left-0'
    // Calculate width based on character count (approximate 0.6em per character)
    const charCount = content.length
    const width = `${Math.max(charCount * 0.6, 2)}em`

    switch (type) {
      case 'marker':
        return (
          <HighlightMarker
            ref={(el) => {
              const key = `highlight-${segmentIndex}`
              if (el) svgRefs.current.set(key, el)
              else svgRefs.current.delete(key)
            }}
            data-segment-index={segmentIndex}
            className={`${baseClass} top-[0.1em] mix-blend-multiply`}
            style={{ width, height: '1.2em', opacity: 0 }}
          />
        )
      case 'circle':
        return (
          <HighlightCircle
            ref={(el) => {
              const key = `highlight-${segmentIndex}`
              if (el) svgRefs.current.set(key, el)
              else svgRefs.current.delete(key)
            }}
            data-segment-index={segmentIndex}
            className={`${baseClass} bottom-0`}
            style={{ width, opacity: 0 }}
          />
        )
      case 'underline':
        return (
          <HighlightUnderline
            ref={(el) => {
              const key = `highlight-${segmentIndex}`
              if (el) svgRefs.current.set(key, el)
              else svgRefs.current.delete(key)
            }}
            data-segment-index={segmentIndex}
            className={`${baseClass} bottom-0`}
            style={{ width, opacity: 0 }}
          />
        )
      default:
        return null
    }
  }

  // Render words from a text string, splitting by spaces
  const renderWords = (content: string, segmentKey: string) => {
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
            const key = `${segmentKey}-word-${i}`
            if (el) wordsRef.current.set(key, el)
            else wordsRef.current.delete(key)
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
    const words = content.split(/(\s+)/)

    return (
      <span key={`highlight-${segmentIndex}`} className="relative inline-block whitespace-nowrap">
        {renderHighlightSVG(highlightType, segmentIndex, content)}
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
                  const key = `highlight-${segmentIndex}-word-${i}`
                  if (el) wordsRef.current.set(key, el)
                  else wordsRef.current.delete(key)
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
        if (segment.type === 'link') {
          return (
            <a
              key={`link-${index}`}
              href={segment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground/80 transition-colors"
            >
              {renderWords(segment.content, `link-${index}`)}
            </a>
          )
        }

        if (segment.type === 'brand') {
          return (
            <span key={`brand-${index}`} className="font-sans font-bold">
              {renderWords(segment.content, `brand-${index}`)}
            </span>
          )
        }

        if (segment.type === 'break') {
          return <br key={`br-${index}`} />
        }

        if (segment.type === 'highlight') {
          return renderHighlightedPhrase(segment.content, segment.highlightType, index)
        }

        // Regular text
        return (
          <span key={`text-${index}`}>{renderWords(segment.content, `text-${index}`)}</span>
        )
      })}
    </div>
  )
}
