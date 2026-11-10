import { expect, test } from '@playwright/test'

const previewRoute = '/promo-ad-creatives/'

test('hidden creative editor renders all nine Bulgarian previews with the approved fonts', async ({
  page,
}) => {
  await page.goto(previewRoute)

  await expect(page.locator('.creative')).toHaveCount(9)
  await expect(page.locator('[data-edit-key="duo.detail"]')).toHaveCount(3)
  await expect(page.locator('[data-edit-key="trio.detail"]')).toHaveCount(3)
  await expect(page.locator('[data-edit-key="six.detail"]')).toHaveCount(3)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex, nofollow, noarchive, nosnippet, noimageindex'
  )

  const typography = await page.evaluate(async () => {
    await document.fonts.ready
    const brand = document.querySelector<HTMLElement>('.creative__brand strong')
    const tagline = document.querySelector<HTMLElement>('.creative__brand span')
    const headline = document.querySelector<HTMLElement>('.creative__copy h2')

    if (!brand || !tagline || !headline) throw new Error('Creative typography targets are missing.')

    return {
      geistMonoLoaded: document.fonts.check('700 32px "Geist Mono"', 'ОКЕЙ €15.98'),
      brand: getComputedStyle(brand).fontFamily,
      tagline: getComputedStyle(tagline).fontFamily,
      headline: getComputedStyle(headline).fontFamily,
    }
  })

  expect(typography).toEqual({
    geistMonoLoaded: true,
    brand: 'Arial, Helvetica, sans-serif',
    tagline: 'Arial, Helvetica, sans-serif',
    headline: '"Geist Mono", monospace',
  })
})

test('live Bulgarian edits synchronize and reopen from the shareable URL', async ({
  browser,
  page,
}) => {
  await page.goto(previewRoute)

  const synchronizedDetails = page.locator('[data-edit-key="duo.detail"]')
  await synchronizedDetails.nth(0).fill('Два буркана. Двойно спокойствие.')
  await expect(synchronizedDetails).toHaveText([
    'Два буркана. Двойно спокойствие.',
    'Два буркана. Двойно спокойствие.',
    'Два буркана. Двойно спокойствие.',
  ])
  await expect(page).toHaveURL(/#edits=/)

  const sharedUrl = page.url()
  const cleanContext = await browser.newContext()
  const sharedPage = await cleanContext.newPage()

  try {
    await sharedPage.goto(sharedUrl)
    await expect(sharedPage.locator('[data-edit-key="duo.detail"]')).toHaveText([
      'Два буркана. Двойно спокойствие.',
      'Два буркана. Двойно спокойствие.',
      'Два буркана. Двойно спокойствие.',
    ])
  } finally {
    await cleanContext.close()
  }
})

test('hostile filters and shared text are handled without markup injection', async ({ page }) => {
  await page.goto(`${previewRoute}?bundle=__proto__&format=constructor`)

  await expect(page.locator('body')).toHaveAttribute('data-invalid-filters', 'true')
  await expect(page.locator('.creative')).toHaveCount(9)
  await expect(page.getByRole('status')).toHaveText(
    'Невалиден филтър — показани са всички визии.'
  )

  const hostileEdits = encodeURIComponent(
    JSON.stringify({ 'duo.detail': '<img src=x onerror=alert(1)>Само текст' })
  )
  await page.goto(`${previewRoute}#edits=${hostileEdits}`)

  await expect(page.locator('[data-edit-key="duo.detail"]')).toHaveText([
    '<img src=x onerror=alert(1)>Само текст',
    '<img src=x onerror=alert(1)>Само текст',
    '<img src=x onerror=alert(1)>Само текст',
  ])
  await expect(page.locator('img[src="x"]')).toHaveCount(0)
})
