import { expect, test } from '@playwright/test'

const route = '/promo-ad-creatives/2026/11-november/testimonial-maria-crunch/index.html'

test('Maria creative has three editable formats and its own colors', async ({ page }) => {
  await page.goto(route)
  await expect(page.locator('.creative')).toHaveCount(3)
  const quotes = page.locator('[data-edit-key="testimonial.quote"]')
  await expect(quotes.first()).toContainText('Не знаех, че хрупкавото')
  await expect(page.locator('.creative').first()).toHaveCSS('background-color', 'rgb(255, 203, 85)')
  await expect(page.locator('.testimonial__frame').first()).toHaveCSS('border-top-color', 'rgb(0, 0, 0)')
  await quotes.first().fill('Хрупкаво и вкусно.')
  await expect(quotes).toHaveText(Array(3).fill('Хрупкаво и вкусно.'))
})

for (const [format, height] of [['square', 1080], ['portrait', 1350], ['story', 1920]] as const) {
  test(`Maria ${format} has full-size artwork and a loaded jar`, async ({ page }) => {
    await page.goto(`${route}?format=${format}&export=1`)
    const creative = page.locator('.creative')
    await expect(creative).toHaveCount(1)
    const bounds = await creative.boundingBox()
    expect(bounds?.width).toBe(1080)
    expect(bounds?.height).toBe(height)
    await expect(creative).toContainText('Мария, 29 г.')
    await expect(creative.locator('img')).toHaveJSProperty('complete', true)
    expect(await creative.locator('img').evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0)
  })
}
