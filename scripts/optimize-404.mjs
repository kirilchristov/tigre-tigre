import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const inputPath = '/Users/kirilchristov/Downloads/tigre-tigre/tigre-tigre-31.jpg'
const outputDir = path.join(__dirname, '../public/images')

const sizes = [
  { name: '404-sm', width: 640 },
  { name: '404-md', width: 1024 },
  { name: '404-lg', width: 1920 },
]

async function optimize404Image() {
  console.log('Processing 404 page image...')

  for (const size of sizes) {
    const outputPath = path.join(outputDir, `${size.name}.webp`)

    await sharp(inputPath)
      .resize(size.width, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({ quality: 80 })
      .toFile(outputPath)

    const stats = await sharp(outputPath).metadata()
    const fs = await import('fs')
    const fileSize = fs.statSync(outputPath).size

    console.log(
      `Created ${size.name}.webp: ${stats.width}x${stats.height}, ${(fileSize / 1024).toFixed(0)}KB`
    )
  }

  // Also create a JPEG fallback for older browsers
  const fallbackPath = path.join(outputDir, '404-lg.jpg')
  await sharp(inputPath)
    .resize(1920, null, { withoutEnlargement: true, fit: 'inside' })
    .jpeg({ quality: 80 })
    .toFile(fallbackPath)

  const fs = await import('fs')
  const fallbackSize = fs.statSync(fallbackPath).size
  console.log(`Created 404-lg.jpg (fallback): ${(fallbackSize / 1024).toFixed(0)}KB`)

  console.log('\nDone! 404 images saved to public/images/')
}

optimize404Image().catch(console.error)
