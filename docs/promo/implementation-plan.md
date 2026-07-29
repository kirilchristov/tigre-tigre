# `/promo` implementation plan

## Architecture

Add a lazy-loaded `PromoPage` at `/promo` and render it inside the existing
shared `Layout`. Keep content in focused feature components:

- Editorial promo hero.
- Use-case checklist.
- Bundle grid and bundle card.
- Two offer-benefit panels.
- Brand promise and heat strip.

Use one immutable, typed bundle configuration as the source of commercial
values. Keep all prose in a `promo` namespace in the BG/EN translation files.
Do not duplicate prices, quantities, discounts, or shipping flags in
translations.

```ts
type PromoBundleId = 'single' | 'duo' | 'trio' | 'six'

type PromoBundle = Readonly<{
  id: PromoBundleId
  quantity: 1 | 2 | 3 | 6
  totalCents: number
  savingsCents?: number
  discountPercent: 0 | 10 | 15
  freeShipping: boolean
  imageSrc: string
  emphasis: 'default' | 'good' | 'best'
  shopUrl: string
  copyKey: string
}>
```

Initial values:

| ID | Quantity | Total cents | Savings cents | Discount | Free shipping | Asset | Emphasis |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| `single` | 1 | 799 | — | 0 | No | `/images/promo/one.webp` | `default` |
| `duo` | 2 | 1598 | 170 | 0 | Yes | `/images/promo/duo.webp` | `good` |
| `trio` | 3 | 2160 | 240 | 10 | Yes | `/images/promo/three.webp` | `default` |
| `six` | 6 | 4080 | 790 | 15 | Yes | `/images/promo/six.webp` | `best` |

Money formatting always emits two decimal places and uses the euro symbol.
Render configuration in the table order above; do not sort it at runtime.

## Routing and shared shell

- Register `/promo` as an explicit route before the wildcard 404 route.
- Lazy-load the page and provide a non-disruptive loading fallback.
- Keep the shared header, footer, language control, theme control, Google
  Analytics tracker, and Meta Pixel tracker.
- Make shared navigation route-aware:
  - Logo targets `/`.
  - On `/`, section items retain `#section`.
  - On `/promo`, section items target `/#section`.
- Do not add a Promo link to the global navigation.
- Language remains controlled by the existing `?lang=bg|en` detector and local
  storage. Direct loads of `/promo?lang=en` must render English.

## CTA contract and Shopify boundary

Do not reuse `ProductCTA`. It owns a quantity stepper, one Shopify variant, and
cart-permalink behavior that does not match a fixed bundle card.

For the first release:

- Set every bundle's `shopUrl` to `https://shop.tigre-tigre.com/`.
- Open the URL in a new tab with `noopener noreferrer`.
- Include quantity in the accessible label.
- Do not claim that the target cart contains the displayed quantity or total.

The `shopUrl` field is the future direct-checkout seam. After Shopify pricing is
reconciled, update each configuration entry to a verified bundle product/cart
URL without changing card structure or translated prose.

Before activating direct links, verify:

1. The cart contains the correct variant and quantity.
2. The automatic discount and free-delivery rules apply together as advertised.
3. Cart and checkout totals match the card exactly.
4. Currency and locale remain correct.
5. Existing analytics cross-domain linking is preserved.

The current blocker is documented in [README.md](./README.md): the brochure
uses €21.60/€40.80, while the Shopify fixture uses €21.57/€39.95.

## Metadata, prerendering, and discovery

Centralize route metadata so both `/` and `/promo` own their titles,
descriptions, canonicals, alternates, and social values. Remove route-specific
home metadata from the static HTML shell where it could become stale on client
navigation.

For `/promo`:

- Canonical: `https://tigre-tigre.com/promo`.
- Bulgarian alternate: `https://tigre-tigre.com/promo?lang=bg`.
- English alternate: `https://tigre-tigre.com/promo?lang=en`.
- `x-default`: `https://tigre-tigre.com/promo`.
- Social image: `https://tigre-tigre.com/images/promo/social.jpg` (opaque,
  1200 × 630).
- Open Graph type: `website`.
- Robots: `index, follow` in production; preserve existing preview/staging
  noindex behavior.

Recommended localized metadata:

| Locale | Title | Description |
| --- | --- | --- |
| BG | `ОКЕЙ НАМАЛЕНИЯ | tigre tigre` | `Вземи 1, 2, 3 или 6 буркана tigre tigre с безплатна доставка и до 15% намаление.` |
| EN | `OKAY DISCOUNTS | tigre tigre` | `Get 1, 2, 3, or 6 jars of tigre tigre with free delivery and up to 15% off.` |

Metadata must update before route page-view trackers read `document.title`.

The homepage Product JSON-LD must remain route-managed and include the active
single-jar price. It must be removed on `/promo` and unknown routes so SPA
navigation cannot leave stale homepage structured data behind. Promo-specific
Product/Offer markup remains deferred until the displayed bundle prices have
verified direct-cart destinations.

The query-string language detector must honor `?lang=bg` and `?lang=en` ahead
of local storage. Each explicit language URL must canonicalize to itself, while
the queryless route remains the `x-default`. The language toggle must replace
the `lang` parameter so reloads preserve the selected language. Browser
verification must cover direct loads of both URLs, including visible copy,
document language, title, description, canonical, and reciprocal hreflang
links.

Update prerendering so its route-aware entry accepts the requested URL, renders
the correct route with `StaticRouter`, and includes `/promo` in
`additionalPrerenderRoutes`. The production build must emit
`dist/promo/index.html` containing promo markup and metadata.

Add `https://tigre-tigre.com/promo` to `public/sitemap.xml` with a reasonable
campaign priority below the homepage.

## Implementation sequence

Follow RED → GREEN → refactor:

1. Add failing unit tests for bundle data, money formatting, metadata, and
   route-aware navigation.
2. Add failing integration tests for the `/promo` content and CTA contract.
3. Implement typed data, translations, components, route, navigation, and
   metadata until tests pass.
4. Add failing prerender/build assertions, then implement the route-aware
   prerender and sitemap entry.
5. Add Playwright coverage for critical responsive and navigation flows.
6. Refactor without mutating shared data; maintain new-object/readonly patterns.
7. Complete visual and accessibility QA in every language/theme combination.

## Automated test plan

### Unit

- Bundle configuration is readonly, ordered 1/2/3/6, and contains the exact
  totals, savings, discount, and shipping flags.
- Currency formatter emits `€7.99`, `€15.98`, `€21.60`, and `€40.80`.
- Promotion labels combine discount and free delivery correctly.
- Route metadata returns correct BG/EN title, description, canonical,
  alternates, and social image.
- Shared logo/anchor targets are correct on `/` and `/promo`.

### Integration

- Direct render of `/promo` produces one H1 and does not render the 404 page.
- Exactly four semantic bundle cards render in the configured order.
- All exact BG/EN copy from `design-spec.md` renders after language changes.
- Each CTA has the quantity-aware accessible label and generic storefront URL.
- All external CTAs carry the safe new-tab attributes.
- Theme switching retains readable tokens and product-image stages.
- Shared header/footer navigation returns from `/promo` to homepage sections.

### End to end

- Direct navigation to `/promo` and `/promo?lang=en` succeeds.
- Hero, use-case list, four cards, both benefit panels, and trust strip are
  visible.
- Theme and language toggles work without route loss.
- Clicking a shared section link returns to the corresponding homepage anchor.
- Card layout is one column on mobile, two on tablet, and four on desktop.
- No horizontal overflow occurs at 360 px.
- Keyboard order, focus visibility, heading order, alt text, and textual
  discount labels are accessible.

### Build and release

- Translation validation passes.
- Unit/integration tests pass with at least 80% statements, branches, functions,
  and lines across new or changed promo modules.
- Lint and TypeScript checks pass.
- Production build passes.
- `dist/promo/index.html` contains the localized promo H1, title, canonical, and
  page markup.
- Sitemap contains `/promo`.
- Playwright tests pass.

Verification commands:

```sh
npm run validate:translations
npm run test:coverage
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

## Manual acceptance matrix

Review all eight combinations:

| Viewport | Bulgarian light | Bulgarian dark | English light | English dark |
| --- | --- | --- | --- | --- |
| Mobile, 360 px | Required | Required | Required | Required |
| Desktop, ≥1280 px | Required | Required | Required | Required |

Acceptance criteria:

- The campaign is recognizably derived from the brochure but reads as a web
  page.
- All commercial values and copy match this specification.
- Product photos remain legible and undistorted.
- Red/gold hierarchy works in both themes.
- Four generic storefront CTAs are present and safe.
- There is no misleading direct-cart behavior.
- No print-only QR, page counter, or seal appears.
- No regression occurs on the homepage, shared navigation, analytics, or 404.
