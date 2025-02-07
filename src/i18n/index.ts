import type { StaticLabel } from 'payload'
import { collections } from './collections'
import { commonFields } from './common-fields'
import type { Translation } from './types'

/**
 * Get translation for a field path
 * @param fieldPath - Full path to the field (e.g., "hero1.hero.title" or "title")
 * @param collectionName - Optional collection name if the field is collection-specific
 * @returns Translation object or undefined if not found
 */
export function getFieldTranslation(
  fieldPath: string,
  collectionName?: string,
): Translation | undefined {
  // Helper to normalize field name
  function normalizeFieldName(path: string): string {
    const withoutArray = path.replace(/\[\]/g, '')
    const parts = withoutArray.split('.')
    return parts[parts.length - 1] ?? ''
  }

  // First try to get from common fields
  const normalizedName = normalizeFieldName(fieldPath)
  if (normalizedName in commonFields) {
    return commonFields[normalizedName as keyof typeof commonFields]
  }

  // If collection is specified, try to get from collection-specific fields
  if (collectionName && collectionName in collections) {
    const collection = collections[collectionName as keyof typeof collections]
    if (fieldPath in collection.fields) {
      return collection.fields[fieldPath]
    }
  }

  return undefined
}

/**
 * Convert our Translation type to Payload's StaticLabel type
 */
function toPayloadLabel(translation: Translation | undefined, defaultLabel: string): StaticLabel {
  if (!translation) {
    return defaultLabel
  }
  return {
    en: translation.en || defaultLabel,
    zh: translation.zh || defaultLabel,
  }
}

/**
 * Create field label with translation
 * Returns a Payload-compatible label
 * @param fieldName - The field name to get translation for
 * @param collectionName - Optional collection name for collection-specific fields
 * @param defaultLabel - Default label to use if translation is not found
 * @returns A Payload-compatible label
 * @example
 * ```typescript
 * // Common field
 * label: createFieldLabel('title')
 *
 * // Collection-specific field
 * label: createFieldLabel('heroImage', 'posts', 'Hero Image')
 * ```
 */
export function createFieldLabel(
  fieldName: string,
  collectionName?: string,
  defaultLabel?: string,
): StaticLabel {
  const translation = getFieldTranslation(fieldName, collectionName)
  return toPayloadLabel(translation, defaultLabel || fieldName)
}

// Re-export types and translations
export * from './types'
export { commonFields } from './common-fields'
export { collections } from './collections'
