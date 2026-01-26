import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const inputPath = '/Users/kirilchristov/Downloads/tigre-tigre/tigre-tigre-15.jpg'
const outputDir = path.join(__dirname, '../public/images')

const sizes = [
  { name: 'hero-sm', width: 640 },
  { name: 'hero-md', width: 1024 },
  { name: 'hero-lg', width: 1920 },
]

async function optimizeImage() {
  console.log('Processing image...')

  for (const size of sizes) {
    const outputPath = path.join(outputDir, `${size.name}.webp`)

    await sharp(inputPath)
      .resize(size.width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: 80 })
      .toFile(outputPath)

    const stats = await sharp(outputPath).metadata()
    const fs = await import('fs')
    const fileSize = fs.statSync(outputPath).size

    console.log(`Created ${size.name}.webp: ${stats.width}x${stats.height}, ${(fileSize / 1024).toFixed(0)}KB`)
  }

  // Also create a JPEG fallback for older browsers
  const fallbackPath = path.join(outputDir, 'hero-lg.jpg')
  await sharp(inputPath)
    .resize(1920, null, { withoutEnlargement: true, fit: 'inside' })
    .jpeg({ quality: 80 })
    .toFile(fallbackPath)

  const fs = await import('fs')
  const fallbackSize = fs.statSync(fallbackPath).size
  console.log(`Created hero-lg.jpg (fallback): ${(fallbackSize / 1024).toFixed(0)}KB`)

  console.log('\nDone! Images saved to public/images/')
}

optimizeImage().catch(console.error)
