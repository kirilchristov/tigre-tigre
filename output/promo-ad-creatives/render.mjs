import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const creativeDirectory = fileURLToPath(new URL('./', import.meta.url))
const creativePage = new URL('../../public/promo-ad-creatives/index.html', import.meta.url)
const outputDirectory = `${creativeDirectory}png`
const bundles = Object.freeze(['duo', 'trio', 'six'])
const formats = Object.freeze({
  square: Object.freeze({ width: 1080, height: 1080 }),
  portrait: Object.freeze({ width: 1080, height: 1350 }),
  story: Object.freeze({ width: 1080, height: 1920 }),
})

await mkdir(outputDirectory, { recursive: true })

const browser = await chromium.launch({ headless: true })

try {
  const page = await browser.newPage({ deviceScaleFactor: 1 })

  for (const bundle of bundles) {
    for (const [format, dimensions] of Object.entries(formats)) {
      const url = new URL(creativePage)
      url.searchParams.set('bundle', bundle)
      url.searchParams.set('format', format)
      url.searchParams.set('export', '1')

      await page.setViewportSize(dimensions)
      await page.goto(url.href, { waitUntil: 'networkidle' })
      const geistMonoLoaded = await page.evaluate(async () => {
        await document.fonts.ready
        return document.fonts.check('700 32px "Geist Mono"', 'ОКЕЙ €15.98')
      })

      if (!geistMonoLoaded) {
        throw new Error('Geist Mono did not load; refusing to export with a fallback font.')
      }

      await page.locator('.creative').screenshot({
        path: `${outputDirectory}/${bundle}-${format}.png`,
        animations: 'disabled',
      })
      console.log(`Rendered ${bundle}-${format}.png (${dimensions.width}x${dimensions.height})`)
    }
  }
} finally {
  await browser.close()
}
