import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const creativeDirectory = fileURLToPath(new URL('./', import.meta.url))
const previewDirectory = fileURLToPath(new URL('../../public/promo-ad-creatives/', import.meta.url))
const verifyPngs = process.argv.includes('--png')
const formats = Object.freeze({
  square: Object.freeze({ width: 1080, height: 1080 }),
  portrait: Object.freeze({ width: 1080, height: 1350 }),
  story: Object.freeze({ width: 1080, height: 1920 }),
})
const bundles = Object.freeze(['duo', 'trio', 'six'])

const html = await readFile(`${previewDirectory}index.html`, 'utf8')
const css = await readFile(`${previewDirectory}styles.css`, 'utf8')

await access(`${previewDirectory}assets/geist-mono-cyrillic.woff2`)
await access(`${previewDirectory}assets/geist-mono-latin.woff2`)
assert.ok(css.includes("font-family: 'Geist Mono'"), 'Geist Mono must be the default creative font')
assert.ok(
  css.includes('font: 700 42px/0.9 Arial, Helvetica, sans-serif'),
  'The tigre tigre brand must use Arial Bold'
)
assert.ok(
  css.includes('font: 700 17px/1 Arial, Helvetica, sans-serif'),
  'The Bulgarian brand tagline must use Arial Bold'
)

for (const requiredCopy of [
  'БЕЗПЛАТНА ДОСТАВКА',
  '-10% + БЕЗПЛАТНА ДОСТАВКА',
  '-15% + БЕЗПЛАТНА ДОСТАВКА',
  '€15.98',
  '€21.60',
  '€40.80',
]) {
  assert.ok(html.includes(requiredCopy), `Missing required offer copy: ${requiredCopy}`)
}

for (const bundle of bundles) {
  await access(`${previewDirectory}assets/${bundle}.webp`)

  if (verifyPngs) {
    for (const [format, dimensions] of Object.entries(formats)) {
      const outputPath = `${creativeDirectory}png/${bundle}-${format}.png`
      const metadata = await sharp(outputPath).metadata()

      assert.equal(metadata.format, 'png', `${bundle}-${format} must be a PNG`)
      assert.equal(metadata.width, dimensions.width, `${bundle}-${format} has the wrong width`)
      assert.equal(metadata.height, dimensions.height, `${bundle}-${format} has the wrong height`)
    }
  }
}

console.log(
  verifyPngs
    ? 'Verified 9 ad creatives, dimensions, bundled fonts, local assets, and offer copy.'
    : 'Verified the one-page HTML preview, bundled fonts, local assets, and offer copy.'
)
