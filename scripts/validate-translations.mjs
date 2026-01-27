#!/usr/bin/env node

import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

function log(message, color = COLORS.reset) {
  console.log(`${color}${message}${COLORS.reset}`)
}

function loadJSON(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    log(`Error reading ${filePath}: ${error.message}`, COLORS.red)
    process.exit(1)
  }
}

function flattenObject(obj, prefix = '') {
  const result = {}

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, newKey))
    } else {
      result[newKey] = value
    }
  }

  return result
}

function validateTranslations() {
  log('\n🔍 Validating translation files...', COLORS.cyan)

  const publicLocalesPath = join(__dirname, '..', 'public', 'locales')
  const enPath = join(publicLocalesPath, 'en', 'translation.json')
  const bgPath = join(publicLocalesPath, 'bg', 'translation.json')

  // Load translation files
  const enTranslations = loadJSON(enPath)
  const bgTranslations = loadJSON(bgPath)

  // Flatten nested objects to dot notation
  const enFlat = flattenObject(enTranslations)
  const bgFlat = flattenObject(bgTranslations)

  const enKeys = Object.keys(enFlat).sort()
  const bgKeys = Object.keys(bgFlat).sort()

  let hasErrors = false

  // Check for missing keys in Bulgarian
  const missingInBg = enKeys.filter((key) => !bgKeys.includes(key))
  if (missingInBg.length > 0) {
    hasErrors = true
    log('\n❌ Keys missing in Bulgarian (bg):', COLORS.red)
    missingInBg.forEach((key) => {
      log(`   - ${key}`, COLORS.yellow)
    })
  }

  // Check for missing keys in English
  const missingInEn = bgKeys.filter((key) => !enKeys.includes(key))
  if (missingInEn.length > 0) {
    hasErrors = true
    log('\n❌ Keys missing in English (en):', COLORS.red)
    missingInEn.forEach((key) => {
      log(`   - ${key}`, COLORS.yellow)
    })
  }

  // Check for empty values
  const emptyInEn = enKeys.filter((key) => !enFlat[key] || String(enFlat[key]).trim() === '')
  const emptyInBg = bgKeys.filter((key) => !bgFlat[key] || String(bgFlat[key]).trim() === '')

  if (emptyInEn.length > 0) {
    hasErrors = true
    log('\n⚠️  Empty values in English (en):', COLORS.yellow)
    emptyInEn.forEach((key) => {
      log(`   - ${key}`, COLORS.yellow)
    })
  }

  if (emptyInBg.length > 0) {
    hasErrors = true
    log('\n⚠️  Empty values in Bulgarian (bg):', COLORS.yellow)
    emptyInBg.forEach((key) => {
      log(`   - ${key}`, COLORS.yellow)
    })
  }

  // Summary
  log('\n' + '='.repeat(50), COLORS.blue)
  if (hasErrors) {
    log('❌ Translation validation FAILED', COLORS.red)
    log(`   English keys: ${enKeys.length}`, COLORS.reset)
    log(`   Bulgarian keys: ${bgKeys.length}`, COLORS.reset)
    log(`   Missing in BG: ${missingInBg.length}`, COLORS.red)
    log(`   Missing in EN: ${missingInEn.length}`, COLORS.red)
    log(`   Empty in EN: ${emptyInEn.length}`, COLORS.yellow)
    log(`   Empty in BG: ${emptyInBg.length}`, COLORS.yellow)
    process.exit(1)
  } else {
    log('✅ Translation validation PASSED', COLORS.green)
    log(`   Total keys validated: ${enKeys.length}`, COLORS.reset)
    log('   All translation keys are in sync! 🎉', COLORS.green)
  }
  log('='.repeat(50) + '\n', COLORS.blue)
}

// Run validation
validateTranslations()
