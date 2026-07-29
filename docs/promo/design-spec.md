# `/promo` design specification

## Design intent

Translate the brochure's loud, practical offer sheet into a polished tigre
tigre web page. Keep its humor, red promotional blocks, yellow highlights,
black outlines, and clear quantity ladder, while adding breathing room,
consistent typography, and responsive structure.

The result should feel like the same campaign, not a scan of a flyer.

## Visual system

Use existing CSS theme tokens:

| Role | Token |
| --- | --- |
| Page and card surfaces | `background`, `card` |
| Primary text and outlines | `foreground`, `card-foreground` |
| Secondary surfaces and copy | `muted`, `muted-foreground` |
| Dividers | `border` |
| Promotional red | `brand-600` / `brand-700` |
| Yellow highlight | `gold` |
| Keyboard focus | `ring` / `cta-focus-ring` |

Rules:

- Keep layouts and typography readable in both themes.
- Preserve a white product-image stage in both themes so jar photography stays
  true to source.
- Use black/foreground and gold diagonal stripes sparingly as a hero divider or
  compact campaign accent.
- Use red for the main discount statement, primary CTAs, and the best-offer
  emphasis; use gold for the “good deal” emphasis.
- Use existing body and mono type treatments. Do not introduce a campaign-only
  webfont.
- Use solid borders and modest radii. Avoid heavy shadows and glossy gradients.
- Motion is limited to subtle CSS opacity/transform transitions and must stop
  under `prefers-reduced-motion: reduce`. Do not add GSAP to this page.

## Responsive composition

### Mobile: 360–639 px

```text
┌──────────────────────────┐
│ red discount panel       │
│ brand                    │
│ use cases + product      │
├──────────────────────────┤
│ 1-jar card               │
│ 2-jar card               │
│ 3-jar card               │
│ 6-jar card               │
├──────────────────────────┤
│ 2-jar benefits           │
│ 6-jar benefits           │
├──────────────────────────┤
│ 100% promise · heat 2/5  │
└──────────────────────────┘
```

- One column throughout.
- Avoid horizontal scrolling at 360 px.
- Keep cards content-driven rather than forcing equal heights on mobile.
- CTA targets are at least 44 px high and span the usable card width.

### Tablet: 640–1023 px

- Stack the hero's editorial blocks unless there is enough width for a balanced
  two-column composition.
- Display bundle cards in a two-column grid.
- Benefit panels may remain stacked to preserve readable lists.

### Desktop: 1024 px and above

- Use a split hero: product/use-case editorial content and the red discount
  statement occupy balanced columns.
- Display all four bundle cards in one row.
- Display the 2-jar and 6-jar benefit panels side by side.
- Constrain the page to the site's existing content width and preserve generous
  section spacing.

## Imagery

| Offer | Asset | Rendering |
| --- | --- | --- |
| 1 jar | `/images/promo/one.webp` | Supplied single-jar composition |
| 2 jars | `/images/promo/duo.webp` | Supplied two-jar composition |
| 3 jars | `/images/promo/three.webp` | Supplied three-jar composition |
| 6 jars | `/images/promo/six.webp` | Supplied six-jar composition |
| Social preview | `/images/promo/social.jpg` | Opaque branded 1200 × 630 card |

The PNG originals remain in `public/images/promo/`. Delivery assets are
1024 × 1024 WebP images generated at quality 86, alpha quality 100, and effort
6. `npm run generate:promo-images` regenerates the delivery files and the
1200 × 630 JPEG social card. Set explicit image dimensions/aspect ratios to
prevent layout shift. Card images are lazy-loaded. The principal hero image may
load eagerly if it is the likely largest-contentful-paint element.

Alt text describes quantity and product, not the visual sales badge. Example:
“Six jars of tigre tigre chili crunch.”

## Exact Bulgarian copy inventory

Bulgarian is the canonical campaign copy. Normalize monetary amounts to two
decimal places and percentages to include `%`.

### Brand and hero

| Key | Copy |
| --- | --- |
| Brand | `tigre tigre` |
| Tagline | `безсрамно вкусно` |
| Product | `чили крънч` |
| Campaign headline | `ОКЕЙ НАМАЛЕНИЯ` |
| Campaign lead | `до -15%` |
| Campaign qualifier | `на избрани количества буркани` |
| Intro | `Вземи повече буркани и получи едно напълно окей намаление.` |

### Use cases

- `ориз, нудъли, яйца`
- `пица, баница, хляб`
- `шкембе и рибена чорба`
- `салата и таратор`
- `сладолед`

### Bundle cards

| Quantity | Total | Promotion | Savings | Card line |
| ---: | ---: | --- | ---: | --- |
| `1 буркан` | `€7.99` | `0% намаление` | — | `за да опиташ` |
| `2 буркана` | `€15.98` | `+ безплатна доставка` | `Спестяваш €1.70` | `за да си спестиш доставката` |
| `3 буркана` | `€21.60` | `-10% + безплатна доставка` | `Спестяваш €2.40` | `за да има` |
| `6 буркана` | `€40.80` | `-15% + безплатна доставка` | `Спестяваш €7.90` | `за наши хора` |

Every card CTA says `Към магазина`. Its accessible label must include the
quantity, for example `Към магазина — 3 буркана`.

### Benefit panels

| 2-jar panel | 6-jar panel |
| --- | --- |
| `ДОБРА ОФЕРТА` | `ОЩЕ ПО-ДОБРА ОФЕРТА` |
| `ВЗЕМИ 2 БУРКАНА` | `ВЗЕМИ 6 БУРКАНА` |
| `Получаваш:` | `Получаваш:` |
| `безплатна доставка` | `-15% намаление` |
| `резервен буркан` | `спестяваш 5 доставки` |
| `кратко спокойствие` | `достатъчно за известно време` |

### Trust strip

- `100% безсрамно вкусно`
- `2/5 ЛЮТО`

## Exact English copy inventory

English preserves the joke and hierarchy without translating word-for-word
where that would sound unnatural.

### Brand and hero

| Key | Copy |
| --- | --- |
| Brand | `tigre tigre` |
| Tagline | `shamelessly delicious` |
| Product | `chili crunch` |
| Campaign headline | `OKAY DISCOUNTS` |
| Campaign lead | `up to 15% off` |
| Campaign qualifier | `on selected jar quantities` |
| Intro | `Grab more jars and get a perfectly okay discount.` |

### Use cases

- `rice, noodles, eggs`
- `pizza, banitsa, bread`
- `tripe soup and fish soup`
- `salad and tarator`
- `ice cream`

### Bundle cards

| Quantity | Total | Promotion | Savings | Card line |
| ---: | ---: | --- | ---: | --- |
| `1 jar` | `€7.99` | `0% off` | — | `to give it a try` |
| `2 jars` | `€15.98` | `+ free delivery` | `You save €1.70` | `to save the delivery` |
| `3 jars` | `€21.60` | `10% off + free delivery` | `You save €2.40` | `so there is always some` |
| `6 jars` | `€40.80` | `15% off + free delivery` | `You save €7.90` | `for our people` |

Every card CTA says `Go to shop`. Its accessible label must include the
quantity, for example `Go to shop — 3 jars`.

### Benefit panels

| 2-jar panel | 6-jar panel |
| --- | --- |
| `GOOD DEAL` | `EVEN BETTER DEAL` |
| `GET 2 JARS` | `GET 6 JARS` |
| `You get:` | `You get:` |
| `free delivery` | `15% off` |
| `a backup jar` | `save 5 deliveries` |
| `brief peace of mind` | `enough for a while` |

### Trust strip

- `100% shamelessly delicious`
- `2/5 HEAT`

## Content hierarchy and accessibility

- Use one H1 for the campaign headline.
- Use H2 elements for bundles and benefit sections; use H3 elements for
  individual bundle titles only when required by the final component hierarchy.
- Render use cases and benefits as semantic lists, not disabled checkboxes.
- Text must carry discount meaning; color and starburst shapes are decorative.
- Decorative stripes and icons use `aria-hidden="true"`.
- All interactive elements have visible light- and dark-theme focus states.
- Maintain WCAG AA text contrast.
- Preserve logical DOM and keyboard order across all breakpoints.
- External CTAs use `target="_blank"` and `rel="noopener noreferrer"`.
- Do not autoplay or require animation to understand the offer.
