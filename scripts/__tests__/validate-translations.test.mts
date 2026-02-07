import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
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

describe('translation files', () => {
  const localesPath = join(__dirname, '..', '..', 'src', 'locales')
  const en = JSON.parse(readFileSync(join(localesPath, 'en', 'translation.json'), 'utf-8'))
  const bg = JSON.parse(readFileSync(join(localesPath, 'bg', 'translation.json'), 'utf-8'))
  const enKeys = Object.keys(flattenObject(en)).sort()
  const bgKeys = Object.keys(flattenObject(bg)).sort()

  it('EN and BG have the same keys', () => {
    const missingInBg = enKeys.filter((k) => !bgKeys.includes(k))
    const missingInEn = bgKeys.filter((k) => !enKeys.includes(k))

    expect(missingInBg, 'Keys missing in BG').toEqual([])
    expect(missingInEn, 'Keys missing in EN').toEqual([])
  })

  it('no empty values in EN', () => {
    const enFlat = flattenObject(en)
    const empty = enKeys.filter((k) => !enFlat[k] || String(enFlat[k]).trim() === '')
    expect(empty, 'Empty EN values').toEqual([])
  })

  it('no empty values in BG', () => {
    const bgFlat = flattenObject(bg)
    const empty = bgKeys.filter((k) => !bgFlat[k] || String(bgFlat[k]).trim() === '')
    expect(empty, 'Empty BG values').toEqual([])
  })
})
