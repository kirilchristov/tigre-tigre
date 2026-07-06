import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const src = '/Users/kirilchristov/Documents/PROJECTS/_Hroup/tigre-tigre space/tigre-tigre photo shoot/tigre-tigre-10.jpg'
const outDir = path.join(__dirname, '../public/images/story')

fs.mkdirSync(outDir, { recursive: true })

const sizes = [
  { suffix: 'sm', width: 640 },
  { suffix: 'md', width: 1080 },
  { suffix: 'lg', width: 1440 },
]

for (const { suffix, width } of sizes) {
  const tmp = path.join(outDir, `tmp-${suffix}.webp`)
  await sharp(src).resize(width, null, { withoutEnlargement: true, fit: 'inside' }).webp({ quality: 82 }).toFile(tmp)
  const { width: w, height: h } = await sharp(tmp).metadata()
  const out = path.join(outDir, `story-${w}x${h}.webp`)
  fs.renameSync(tmp, out)
  console.log(`${out} — ${(fs.statSync(out).size / 1024).toFixed(0)}KB`)
}
