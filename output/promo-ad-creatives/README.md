# Promo ad creatives

Nine ready-to-use Meta and Instagram creatives based on the promo page's 2-, 3-, and 6-jar bundle cards.

## Shareable HTML preview

The hidden, noindex preview is deployed at `/promo-ad-creatives/`. Its source is in `public/promo-ad-creatives/`, where all nine variations appear on one page.

## PNGs (generate after approval)

- `png/duo-*` — 2 jars, free delivery
- `png/trio-*` — 3 jars, 10% off and free delivery
- `png/six-*` — 6 jars, 15% off and free delivery
- `square` — 1080 × 1080 feed creative
- `portrait` — 1080 × 1350 (4:5) feed creative
- `story` — 1080 × 1920 Story/Reel creative

## Edit and regenerate

Edit copy in `index.html` and styling in `styles.css`, then run:

```sh
node output/promo-ad-creatives/render.mjs
node output/promo-ad-creatives/verify.mjs --png
```

Open `public/promo-ad-creatives/index.html` directly in a browser for the one-page contact-sheet preview. Add `?safe=1` to show the conservative content-safe guides. Story/Reel designs keep important content between 250 px from the top and 310 px from the bottom.

The `assets/` folder is intentionally local so this creative folder can be moved or archived independently of the website.

Typography is bundled for deterministic offline exports: Arial Bold is used for `tigre tigre` and `безсрамно вкусно`; all remaining creative text uses the local Geist Mono webfonts.
