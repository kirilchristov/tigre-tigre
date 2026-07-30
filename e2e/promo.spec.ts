import { expect, test } from '@playwright/test'

function extractJsonLd(html: string) {
  return [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]))
}

test('promo route renders the approved campaign and safe bundle cart links', async ({ page }) => {
  await page.goto('/promo?lang=bg')

  await expect(page.getByRole('heading', { level: 1, name: 'ОКЕЙ НАМАЛЕНИЯ' })).toBeVisible()
  await expect(page.getByText('100% безсрамно вкусно')).toBeVisible()

  const cards = page.getByTestId('promo-bundle-card')
  await expect(cards).toHaveCount(4)
  await expect(cards.nth(0).getByText('€7.99', { exact: true })).toBeVisible()
  await expect(cards.nth(1).getByText('€15.98', { exact: true })).toBeVisible()
  await expect(cards.nth(2).getByText('€21.60', { exact: true })).toBeVisible()
  await expect(cards.nth(3).getByText('€40.80', { exact: true })).toBeVisible()
  await expect(cards.nth(1).getByText('Спестяваш €1.74')).toBeVisible()
  await expect(cards.nth(2).getByText('Спестяваш €4.11')).toBeVisible()
  await expect(cards.nth(3).getByText('Спестяваш €8.88')).toBeVisible()
  await expect(cards.nth(2).getByText('€23.97')).toHaveClass(/line-through/)
  await expect(cards.nth(3).getByText('€47.94')).toHaveClass(/line-through/)

  const savingsTrigger = cards.nth(2).getByRole('button', {
    name: 'Как се изчислява „Спестяваш €4.11“',
  })
  await savingsTrigger.hover()
  const savingsTooltip = cards.nth(2).getByRole('tooltip')
  await expect(savingsTooltip).toBeVisible()
  await expect(savingsTooltip).toContainText(
    'Спестяваш €4.11 (€2.37 отстъпка + €1.74 доставка)'
  )

  const ctas = cards.getByRole('link', { name: /Към магазина —/ })
  await expect(ctas).toHaveCount(4)
  const expectedCartUrls = [
    'https://shop.tigre-tigre.com/cart/56986218955100:1',
    'https://shop.tigre-tigre.com/cart/56986218955100:2',
    'https://shop.tigre-tigre.com/cart/56986218955100:3',
    'https://shop.tigre-tigre.com/cart/56986218955100:6',
  ]

  for (const [index, cta] of (await ctas.all()).entries()) {
    await expect(cta).toHaveAttribute('href', expectedCartUrls[index])
    await expect(cta).toHaveAttribute('target', '_blank')
    await expect(cta).toHaveAttribute('rel', 'noopener noreferrer')
  }
})

test('promo route keeps language, theme, and homepage navigation working', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/promo?lang=bg')

  await page.locator('button[aria-label="Switch to English"]:visible').click()
  await expect(page.getByRole('heading', { level: 1, name: 'OKAY DISCOUNTS' })).toBeVisible()
  await expect(page).toHaveTitle('OKAY DISCOUNTS | tigre tigre')
  await expect(page).toHaveURL('/promo?lang=en')

  await page.reload()
  await expect(page.getByRole('heading', { level: 1, name: 'OKAY DISCOUNTS' })).toBeVisible()

  await page.locator('button[aria-label="Switch to dark mode"]:visible').click()
  await expect(page.locator('html')).toHaveClass(/dark/)

  const mainNavigation = page.getByRole('navigation', { name: 'Main navigation' })
  await expect(mainNavigation.getByRole('link', { name: 'Contact' })).toHaveAttribute(
    'href',
    '/#contact'
  )
})

test('language query parameters select their exact localized promo version', async ({ page }) => {
  await page.goto('/promo?lang=en')

  await expect(page.getByRole('heading', { level: 1, name: 'OKAY DISCOUNTS' })).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page).toHaveTitle('OKAY DISCOUNTS | tigre tigre')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://tigre-tigre.com/promo?lang=en'
  )
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    'Get 1, 2, 3, or 6 jars of tigre tigre with free delivery and up to 15% off.'
  )

  await page.goto('/promo?lang=bg')

  await expect(page.getByRole('heading', { level: 1, name: 'ОКЕЙ НАМАЛЕНИЯ' })).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('lang', 'bg')
  await expect(page).toHaveTitle('ОКЕЙ НАМАЛЕНИЯ | tigre tigre')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://tigre-tigre.com/promo?lang=bg'
  )
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    'Вземи 1, 2, 3 или 6 буркана tigre tigre с безплатна доставка и до 15% намаление.'
  )

  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
    'href',
    'https://tigre-tigre.com/promo?lang=en'
  )
  await expect(page.locator('link[rel="alternate"][hreflang="bg"]')).toHaveAttribute(
    'href',
    'https://tigre-tigre.com/promo?lang=bg'
  )
})

test('promo route does not overflow a narrow mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 })
  await page.goto('/promo?lang=bg')

  await expect(page.getByTestId('promo-bundle-card')).toHaveCount(4)
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }))

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth)
})

test('promo bundle cards form one row at the desktop breakpoint', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 })
  await page.goto('/promo?lang=bg')

  const cardTops = await page.getByTestId('promo-bundle-card').evaluateAll((cards) =>
    cards.map((card) => Math.round(card.getBoundingClientRect().top))
  )

  expect(new Set(cardTops).size).toBe(1)
})

test('production preview serves prerendered promo metadata and sitemap entry', async ({
  request,
}) => {
  const homeResponse = await request.get('/')
  expect(homeResponse.ok()).toBe(true)
  const homeJsonLd = extractJsonLd(await homeResponse.text())
  const homeProducts = homeJsonLd.filter((entry) => entry['@type'] === 'Product')

  expect(homeProducts).toHaveLength(1)
  expect(homeProducts[0]).toMatchObject({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'tigre tigre Чили крънч',
    brand: { '@type': 'Brand', name: 'tigre tigre' },
    image: 'https://tigre-tigre.com/images/product-shots/2026_front-2048x2048.webp',
    url: 'https://tigre-tigre.com/',
    offers: {
      '@type': 'Offer',
      url: 'https://shop.tigre-tigre.com/products/tigre-tigre-chili-crunch',
      price: '7.99',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
  })

  const promoResponse = await request.get('/promo')
  expect(promoResponse.ok()).toBe(true)
  const promoHtml = await promoResponse.text()

  expect(promoHtml).toContain('ОКЕЙ НАМАЛЕНИЯ')
  expect(promoHtml).toContain('<title>ОКЕЙ НАМАЛЕНИЯ | tigre tigre</title>')
  expect(promoHtml).toContain(
    '<link rel="canonical" href="https://tigre-tigre.com/promo">'
  )
  expect(promoHtml.match(/rel="canonical"/g)).toHaveLength(1)
  expect(extractJsonLd(promoHtml).filter((entry) => entry['@type'] === 'Product')).toHaveLength(0)

  const sitemapResponse = await request.get('/sitemap.xml')
  expect(await sitemapResponse.text()).toContain('<loc>https://tigre-tigre.com/promo</loc>')
})
