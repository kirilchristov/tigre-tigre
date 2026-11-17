# Promo bundle landing page

## Advertising creative folder convention

Each new advertising concept (vision) must have its own descriptive folder under
`public/promo-ad-creatives/<year>/<month-number>-<month-name>/<concept-name>/`, with its own `index.html` and
concept-specific styles and assets. Shared styles and reusable photos live in
`public/promo-ad-creatives/shared/`. Use the creation month for new concepts;
existing concepts were organized under November 2026. Maintain the ad library
at `public/promo-ad-creatives/index.html` with links to each concept. Keep square, portrait, and story variants of
the same concept together in that folder. Do not add a new concept only as a
query-string option in another concept's page.

Provide a localhost preview link with an explicit `index.html`, for example
`http://localhost:5173/promo-ad-creatives/2026/11-november/testimonial-maria-crunch/index.html`, using the
actual running server port. This is the user's standing preference for future
creative work.

### Preview link list — required maintenance

The short entry URL is `http://localhost:5173/ads.html`. It opens the ad library
where users can navigate to every creative. Keep `public/ads.html` pointing to
the library if its location changes.

Keep [ad-preview-links.txt](./ad-preview-links.txt) updated every time an ad is
created, renamed, moved, or removed, or its available formats change. Include
the library URL, each concept's all-formats URL, and its square, portrait, and
story URLs as plain text on separate lines for easy copying. Group entries by
year and month with human-readable names. Use explicit `index.html` paths and
the current local preview port (default `5173`). Update this file and the
library index in the same change as the creative; do not leave stale links.

## Status

Implemented specification for the `/promo` campaign page.

The page adapts the supplied 9:16 brochure into a responsive, bilingual web
experience. It keeps the brochure's copy and commercial figures, improves the
visual hierarchy, and uses the existing tigre tigre theme rather than recreating
the print layout literally.

## Confirmed decisions

- Public route: `/promo`.
- Languages: Bulgarian and English through the existing language control.
- Themes: light and dark through the existing theme control.
- Shell: use the shared site header and footer.
- Discovery: do not add Promo to the global navigation in the first release.
- Products: show 2-, 3-, and 6-jar offer cards. The single-jar product remains
  featured in the hero.
- CTA: every displayed offer opens a quantity-specific Shopify cart permalink in a new
  tab, using the shared single-jar variant configuration.
- Checkout: card destinations follow `/cart/{variantId}:{quantity}` for 2, 3,
  and 6 jars.
- SEO: the page is indexable, prerendered, canonicalized, and listed in the
  sitemap.
- Localization discovery: `?lang=bg` and `?lang=en` are real runtime language
  variants; query-string selection takes precedence over the cached language,
  each explicit variant is self-canonical, and the language toggle keeps the
  URL synchronized.
- Structured data: the homepage retains one localized Product entity with its
  €7.99 single-jar Offer. `/promo` deliberately does not inherit that homepage
  entity because its multiple promotional quantities are not represented as
  verified structured offers.
- Analytics: the existing Google Analytics and Meta Pixel page-view trackers
  continue to handle route visits.
- Copy: Bulgarian is canonical; English is a faithful brand-voice adaptation.
- Commercial values: derive payable totals from the shared €7.99 product price
  with the homepage's per-jar discount flooring. Free delivery adds €1.74 to
  displayed savings without reducing the payable product total.

## Page structure

1. Editorial promo hero with the brand, product introduction, and “up to 15%”
   message.
2. Chili-crunch use-case checklist.
3. Three flexible bundle offer cards.
4. Per-bundle benefit lists inside each offer card.
5. Brand promise and 2/5 heat strip.

The QR code, print page counter, and print seal/badge are deliberately omitted.
Their role is replaced by the web CTA, brand promise, and heat strip.

## Source material and related documentation

- Detailed visual and copy specification: [design-spec.md](./design-spec.md)
- Engineering and release plan:
  [implementation-plan.md](./implementation-plan.md)
- Shopify pricing model:
  [../shopify/pricing-fixtures.md](../shopify/pricing-fixtures.md)
- Original supplied brochure:
  `/Users/kirilchristov/Desktop/9_by_16_brochure_6.jpg`
- Reserved portable asset location:
  [`assets/`](./assets/)

The original brochure is outside the repository and is not copied by this
documentation change. It must be copied to
`docs/promo/assets/9_by_16_brochure_6.jpg` when a repository-owned binary
reference is approved.

## Scope boundaries

Included in the first release:

- Responsive page design and all approved brochure content.
- BG/EN localization, light/dark themes, route-aware shared navigation.
- Quantity-specific Shopify cart CTAs, metadata, prerendering, sitemap entry,
  and test coverage.

Deferred:

- CMS or Shopify-driven pricing.
- Promo entry in global navigation.
- Checkout conversion events beyond the existing page-view tracking.
- Reproducing print-only QR, page-number, or seal artwork.

## Future development suggestion: prerendered language variants

The current `?lang=bg` and `?lang=en` URLs switch language correctly at
runtime, update their metadata, and self-canonicalize after the application
loads. Because the site is statically hosted, both query variants initially
receive the queryless Bulgarian prerender before JavaScript runs.

For stronger international SEO and support for non-JavaScript crawlers, migrate
the language variants to one of these approaches:

1. Prefer distinct, prerenderable locale paths such as `/bg/promo` and
   `/en/promo`.
2. Alternatively, generate query-aware HTML at the server or edge for
   `?lang=bg` and `?lang=en`.

When implemented, each localized response should contain its final translated
content, document language, title, description, self-canonical, and reciprocal
hreflang links in the original HTML response rather than relying on hydration.

## Known commercial discrepancy

The brochure-approved display values and the current Shopify pricing document
do not agree:

| Bundle | `/promo` display | Shopify pricing fixture | Difference |
| ------ | ---------------: | ----------------------: | ---------: |
| 3 jars |           €21.60 |                  €21.57 |      €0.03 |
| 6 jars |           €40.80 |                  €39.95 |      €0.85 |

The 3-jar Shopify fixture applies a fixed €2.40 reduction to €23.97. The 6-jar
fixture models a 5+1 offer by subtracting €7.99 from €47.94. The promo page
continues to display the approved brochure values, while each CTA now
preconfigures only the product variant and quantity. Shopify remains
authoritative for the final cart and checkout totals, discounts, and shipping.

This quantity-based permalink intentionally follows the homepage purchase flow.
It differs from the dedicated 3-pack and 6-pack variant recommendation in
[`docs/shopify/pricing-fixtures.md`](../shopify/pricing-fixtures.md), so the
older product-scoped automatic-discount rules are not guaranteed by these URLs.
That Shopify configuration remains a commercial follow-up rather than a blocker
for the direct links.

## Repository-level follow-ups found during review

These issues predate the promo page and were not expanded into this campaign's
scope:

- The existing Google Analytics and Meta Pixel integrations should be reviewed
  for consent gating before tracking is initialized.
- `npm audit --omit=dev` reports two high-severity advisories in the
  `react-router` dependency tree related to React Server Components. This site
  uses `BrowserRouter`, not React Server Components, but the dependency should
  still be reviewed in a separate maintenance change. The audit's forced fix
  proposes a breaking downgrade and was not applied.

## Additional info

- 2 jars: pay €15.98; savings €1.74
- 3 jars: €23.97 → pay €21.60; savings €4.11 (€2.37 discount +
  €1.74 delivery)

- 6 jars: €47.94 → pay €40.80; savings €8.88 (€7.14 discount +
  €1.74 delivery)
