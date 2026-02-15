import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import { promisify } from 'util'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const readdir = promisify(fs.readdir)

// Product shots folder
const inputDir = path.join(__dirname, '../public/images/product-shots')
const outputDir = path.join(__dirname, '../public/images/product-shots')

const sizes = [
  { suffix: 'sm', width: 640 },
  { suffix: 'md', width: 1024 },
  { suffix: 'lg', width: 1920 },
  { suffix: 'xl', width: 2480 },
]

async function optimizeImage() {
  console.log('Processing product shots...')

  // Read all files from the input directory
  const files = await readdir(inputDir)
  const imageFiles = files.filter(
    (file) =>
      file.match(/\.(png|jpg|jpeg|webp)$/i) &&
      !file.includes('-sm') &&
      !file.includes('-md') &&
      !file.includes('-lg') &&
      !file.includes('-xl')
  )

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file)
    const baseName = path.basename(file, path.extname(file))

    console.log(`\nProcessing ${file}...`)

    for (const size of sizes) {
      const tempPath = path.join(outputDir, `temp-${baseName}-${size.suffix}.webp`)

      await sharp(inputPath)
        .resize(size.width, null, {
          withoutEnlargement: true,
          fit: 'inside',
        })
        .webp({ quality: 90 })
        .toFile(tempPath)

      const stats = await sharp(tempPath).metadata()
      const outputPath = path.join(outputDir, `${baseName}-${stats.width}x${stats.height}.webp`)

      // Rename temp file to final name with dimensions
      fs.renameSync(tempPath, outputPath)

      const fileSize = fs.statSync(outputPath).size

      console.log(
        `  Created ${baseName}-${stats.width}x${stats.height}.webp: ${(fileSize / 1024).toFixed(0)}KB`
      )
    }
  }
}

optimizeImage().catch(console.error)
