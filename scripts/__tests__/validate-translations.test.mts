import { describe, it, expect } from 'vitest'
import { flattenObject } from '../utils.mjs'

describe('flattenObject()', () => {
  it('flattens nested objects to dot notation', () => {
    const input = {
      nav: { home: 'Home', about: 'About' },
      hero: { title: 'Title' },
    }

    expect(flattenObject(input)).toEqual({
      'nav.home': 'Home',
      'nav.about': 'About',
      'hero.title': 'Title',
    })
  })

  it('preserves array values as leaves', () => {
    const input = { tags: ['a', 'b'], nested: { list: [1, 2] } }

    expect(flattenObject(input)).toEqual({
      tags: ['a', 'b'],
      'nested.list': [1, 2],
    })
  })

  it('handles empty objects', () => {
    expect(flattenObject({})).toEqual({})
  })

  it('handles deeply nested objects', () => {
    const input = { a: { b: { c: { d: 'deep' } } } }

    expect(flattenObject(input)).toEqual({ 'a.b.c.d': 'deep' })
  })
})
