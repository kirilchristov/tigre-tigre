import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const promoDirectory = fileURLToPath(new URL('../public/images/promo/', import.meta.url))
const bundleNames = ['one', 'duo', 'three', 'six']
const webpOptions = Object.freeze({
  quality: 86,
  alphaQuality: 100,
  effort: 6,
})

const bundleResults = await Promise.all(
  bundleNames.map(async (name) => {
    const output = `${promoDirectory}${name}.webp`
    const result = await sharp(`${promoDirectory}${name}.png`)
      .resize({
        width: 1024,
        height: 1024,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp(webpOptions)
      .toFile(output)

    return { output, width: result.width, height: result.height, bytes: result.size }
  })
)

const sixPack = await sharp(`${promoDirectory}six.png`)
  .resize({ width: 570, height: 570, fit: 'contain' })
  .png()
  .toBuffer()

const socialArtwork = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="stripes" width="56" height="56" patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)">
        <rect width="28" height="56" fill="#000000"/>
        <rect x="28" width="28" height="56" fill="#F6CE73"/>
      </pattern>
    </defs>
    <rect width="1200" height="630" fill="#EB4035"/>
    <rect width="1200" height="42" fill="url(#stripes)"/>
    <rect y="588" width="1200" height="42" fill="url(#stripes)"/>
    <rect x="4" y="4" width="1192" height="622" fill="none" stroke="#000000" stroke-width="8"/>
    <text x="64" y="142" font-family="Arial, sans-serif" font-size="62"
      font-weight="800" fill="#000000">tigre tigre</text>
    <text x="68" y="184" font-family="Arial, sans-serif" font-size="24"
      font-weight="700" fill="#FFFFFF">безсрамно вкусно</text>
    <text x="64" y="300" font-family="Arial, sans-serif" font-size="44"
      font-weight="800" fill="#FFFFFF">ОКЕЙ НАМАЛЕНИЯ</text>
    <text x="58" y="477" font-family="Arial, sans-serif" font-size="142"
      font-weight="900" fill="#FFFFFF">-15%</text>
    <text x="68" y="542" font-family="Arial, sans-serif" font-size="22"
      font-weight="700" fill="#000000">на избрани количества буркани</text>
  </svg>
`)

const socialOutput = `${promoDirectory}social.jpg`
const socialResult = await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 3,
    background: '#EB4035',
  },
})
  .composite([
    { input: socialArtwork, left: 0, top: 0 },
    { input: sixPack, left: 620, top: 30 },
  ])
  .jpeg({ quality: 90, progressive: true, chromaSubsampling: '4:4:4' })
  .toFile(socialOutput)

for (const result of bundleResults) {
  console.log(`${result.output}: ${result.width}x${result.height}, ${result.bytes} bytes`)
}
console.log(
  `${socialOutput}: ${socialResult.width}x${socialResult.height}, ${socialResult.size} bytes`
)
