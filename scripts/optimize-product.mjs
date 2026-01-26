import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const inputPath = '/Users/kirilchristov/Downloads/tigre-tigre/tigre-tigre-23.jpg'
const outputDir = path.join(__dirname, '../public/images')

const sizes = [
  { name: 'product-sm', width: 400 },
  { name: 'product-md', width: 600 },
  { name: 'product-lg', width: 800 },
]

async function optimizeImage() {
  console.log('Processing product image...')

  for (const size of sizes) {
    const outputPath = path.join(outputDir, `${size.name}.webp`)

    await sharp(inputPath)
      .resize(size.width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: 85 })
      .toFile(outputPath)

    const stats = await sharp(outputPath).metadata()
    const fileSize = fs.statSync(outputPath).size

    console.log(`Created ${size.name}.webp: ${stats.width}x${stats.height}, ${(fileSize / 1024).toFixed(0)}KB`)
  }

  // JPEG fallback
  const fallbackPath = path.join(outputDir, 'product-lg.jpg')
  await sharp(inputPath)
    .resize(800, null, { withoutEnlargement: true, fit: 'inside' })
    .jpeg({ quality: 85 })
    .toFile(fallbackPath)

  const fallbackSize = fs.statSync(fallbackPath).size
  console.log(`Created product-lg.jpg (fallback): ${(fallbackSize / 1024).toFixed(0)}KB`)

  console.log('\nDone!')
}

optimizeImage().catch(console.error)
