import fs from 'fs'
import path from 'path'
import type { CollectionTranslation, ConfigInfo, Translation, TranslationTemplate } from './types'

type TranslationValue =
  | Translation
  | string
  | TranslationObject
  | TranslationObject[]
  | CollectionTranslation
type TranslationObject = {
  [key: string]: TranslationValue
}

/**
 * Merge translations while preserving non-English content
 */
function mergeTranslations(
  template: TranslationObject,
  existing: TranslationObject,
): TranslationObject {
  if (!template || typeof template !== 'object') return template
  if (!existing || typeof existing !== 'object') return template

  const result: TranslationObject = {}

  // Handle translation field
  if ('en' in template && 'zh' in template) {
    return {
      en: template.en || existing.en || '',
      zh: existing.zh || template.zh || '',
    }
  }

  // Recursively merge nested objects
  for (const key of Object.keys(template)) {
    result[key] = mergeTranslations(
      template[key] as TranslationObject,
      (existing[key] || {}) as TranslationObject,
    )
  }

  return result
}

/**
 * Read existing translations if file exists
 */
function readExistingTranslations(filePath: string): TranslationObject | null {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8')
      // Extract the object from the module
      const match = content.match(/=\s*({[\s\S]*})\s*as\s*const/)
      if (match) {
        return eval(`(${match[1]})`) as TranslationObject
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not read existing translations from ${filePath}, error: ${error}`)
  }
  return null
}

/**
 * Generate types content
 */
function generateTypesContent(configInfo: ConfigInfo): string {
  return `
// Automatically generated types file - do not modify manually

// Basic translation type
export interface Translation {
  en: string
  zh: string
}

// Collection specific field translation type
export interface CollectionFields {
  [key: string]: Translation
}

// Collection translation type
export interface CollectionTranslation {
  singular: Translation
  plural: Translation
  fields: CollectionFields
}

// All collections type
export interface Collections {
  ${configInfo.collections
    .concat(configInfo.globals)
    .map((name) => {
      const propertyName = /[-]/.test(name) ? `'${name}'` : name.toLowerCase()
      return `${propertyName}: CollectionTranslation`
    })
    .join('\n  ')}
}
`.trim()
}

/**
 * Generate collections template content
 */
function generateCollectionsContent(template: TranslationTemplate): string {
  return `
import type { Collections } from './types'

export const collections: Collections = ${formatTranslations(template.collections)} as const
`.trim()
}

/**
 * Format translation object in TypeScript style
 */
function formatTranslations(
  obj: TranslationObject | { [key: string]: CollectionTranslation } | string | undefined,
  indent = 0,
): string {
  if (!obj || typeof obj !== 'object') {
    // Handle primitive values
    return typeof obj === 'string' ? `'${obj.replace(/'/g, "\\'")}'` : String(obj || '')
  }

  const spaces = ' '.repeat(indent)
  const innerSpaces = ' '.repeat(indent + 2)

  if (Array.isArray(obj)) {
    const items = obj.map((item) => formatTranslations(item as TranslationObject, indent + 2))
    return `[\n${innerSpaces}${items.join(`,\n${innerSpaces}`)},\n${spaces}]`
  }

  const entries = Object.entries(obj)
  if (entries.length === 0) return '{}'

  const formattedEntries = entries.map(([key, value]) => {
    // For keys that need quotes, use single quotes
    const formattedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`
    return `${formattedKey}: ${formatTranslations(value as TranslationObject, indent + 2)}`
  })

  return `{\n${innerSpaces}${formattedEntries.join(`,\n${innerSpaces}`)},\n${spaces}}`
}

/**
 * Generate all files
 */
export function generateFiles(
  outputDir: string,
  configInfo: ConfigInfo,
  template: TranslationTemplate,
): void {
  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Generate file content
  const typesContent = generateTypesContent(configInfo)
  const collectionsTemplateContent = generateCollectionsContent(template)

  // Write files
  fs.writeFileSync(path.join(outputDir, 'types.ts'), typesContent)
  fs.writeFileSync(path.join(outputDir, 'collections.template.ts'), collectionsTemplateContent)

  // Generate actual files from templates
  generateActualFromTemplate(
    path.join(outputDir, 'collections.template.ts'),
    path.join(outputDir, 'collections.ts'),
    (content) => {
      const match = content.match(/collections:\s*Collections\s*=\s*({[\s\S]*})\s*as\s*const/)
      return match ? eval(`(${match[1]})`) : {}
    },
  )

  console.log('Translation files generated!')
}

/**
 * Generate actual translation file from template
 */
function generateActualFromTemplate(
  templatePath: string,
  actualPath: string,
  getTranslationsFromContent: (content: string) => TranslationObject,
): void {
  // Read template content
  const templateContent = fs.readFileSync(templatePath, 'utf8')
  const templateTranslations = getTranslationsFromContent(templateContent)

  // Read existing translations
  const existingTranslations = readExistingTranslations(actualPath)

  // Merge translations
  const mergedTranslations = existingTranslations
    ? mergeTranslations(templateTranslations, existingTranslations)
    : templateTranslations

  // Generate new content by replacing translations in template
  const newContent = templateContent.replace(
    /=\s*({[\s\S]*})\s*as\s*const/,
    `= ${formatTranslations(mergedTranslations)} as const`,
  )

  // Write the file
  fs.writeFileSync(actualPath, newContent)
}
