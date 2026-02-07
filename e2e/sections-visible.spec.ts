import { test, expect } from '@playwright/test'

const SECTIONS = [
  'shop',
  'first-tiger-highlight',
  'howto-highlight',
  'about-highlight',
  'contact',
]

test('every section is visible after scrolling to it', async ({ page }) => {
  await page.goto('/')

  // Scroll down incrementally so LazySection's IntersectionObserver
  // triggers and loads each section into the DOM.
  const viewportHeight = page.viewportSize()!.height
  let scrollY = 0
  const pageHeight = await page.evaluate(() => document.body.scrollHeight)
  while (scrollY < pageHeight) {
    scrollY += viewportHeight
    await page.evaluate((y) => window.scrollTo(0, y), scrollY)
    await page.waitForTimeout(300)
    // Page height may grow as lazy sections load
    const newHeight = await page.evaluate(() => document.body.scrollHeight)
    if (newHeight > pageHeight) {
      // keep going
    }
  }

  // Now verify every section is visible
  for (const id of SECTIONS) {
    const section = page.locator(`#${id}`)
    await section.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1500)
    await expect(section).toBeVisible()
  }
})
