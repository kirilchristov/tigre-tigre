import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const inputPath = path.join(__dirname, '../public/images/mocks/mock2.webp')
const outputDir = path.join(__dirname, '../public/images/mocks')

const sizes = [
  { name: 'mock-sm', width: 640 },
  { name: 'mock-md', width: 1024 },
  { name: 'mock-lg', width: 1920 },
]

async function optimizeImage() {
  console.log('Processing image...')

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
  const fallbackPath = path.join(outputDir, 'mock-lg.jpg')
  await sharp(inputPath)
    .resize(1920, null, { withoutEnlargement: true, fit: 'inside' })
    .jpeg({ quality: 80 })
    .toFile(fallbackPath)

  const fs = await import('fs')
  const fallbackSize = fs.statSync(fallbackPath).size
  console.log(`Created mock-lg.jpg (fallback): ${(fallbackSize / 1024).toFixed(0)}KB`)

  console.log('\nDone! Images saved to public/images/mocks/')
}

optimizeImage().catch(console.error)
