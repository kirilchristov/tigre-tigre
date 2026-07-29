import { describe, expect, it } from 'vitest'
import { resolveNavHref } from '../nav-items'

describe('resolveNavHref()', () => {
  it('keeps section anchors local on the homepage', () => {
    expect(resolveNavHref('/', '#contact')).toBe('#contact')
    expect(resolveNavHref('/', '#')).toBe('#')
  })

  it('routes promo visitors back to homepage sections', () => {
    expect(resolveNavHref('/promo', '#contact')).toBe('/#contact')
    expect(resolveNavHref('/promo', '#')).toBe('/')
  })
})
