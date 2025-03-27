import { Thing, WithContext } from 'schema-dts'
import type { SiteSetting } from '@/payload-types'
import {
  extractFAQsFromBlocks,
  generateFAQSchema,
  generateOrganizationSchema,
} from '@/utilities/schema'
import SchemaMarkup from './SchemaMarkup'

interface Schema {
  '@type': string
  [key: string]: any
}

type SchemaItem = Schema | WithContext<Thing>

// Type guard to check if an item has @type property
function hasType(item: any): item is { '@type': string } {
  return (
    typeof item === 'object' &&
    item !== null &&
    '@type' in item &&
    typeof item['@type'] === 'string'
  )
}

interface SchemaOrganizerProps {
  items: SchemaItem[]
  baseUrl?: string
  tenantId?: string
  domain?: string
  /** Site settings for generating global organization schema */
  siteSettings?: SiteSetting | null
  /** Set to true to disable global organization schema inclusion */
  disableGlobalSchema?: boolean
  /** Content that may include FAQ blocks to extract */
  contentBlocks?: any[]
  /** Set to false to disable automatic FAQ extraction (default: true) */
  extractFAQs?: boolean
}

/**
 * SchemaOrganizer component
 *
 * Handles organizing, deduplication and prioritization of schema.org data
 * Can automatically add organization schema if not disabled
 * Can extract FAQs from content blocks if enabled
 *
 * @example
 * ```tsx
 * <SchemaOrganizer
 *   items={[productSchema, breadcrumbSchema]}
 *   baseUrl="https://example.com"
 *   siteSettings={siteSettings}
 *   contentBlocks={page.layout}
 *   extractFAQs={page.structuredData?.extractFAQs !== false}
 * />
 * ```
 */
export function SchemaOrganizer({
  items = [],
  baseUrl,
  tenantId,
  domain,
  siteSettings = null,
  disableGlobalSchema = false,
  contentBlocks = [],
  extractFAQs = true,
}: SchemaOrganizerProps) {
  // Skip if no items
  if (items.length === 0) return null

  // Create a mutable copy of the items array
  const schemas = [...items]

  // Add organization schema if not disabled and we have siteSettings
  if (!disableGlobalSchema && siteSettings && baseUrl) {
    const orgSchema = generateOrganizationSchema({ siteSettings, baseUrl })

    // Only add if no Organization schema already exists
    if (!schemas.some((schema) => hasType(schema) && schema['@type'] === 'Organization')) {
      schemas.push(orgSchema)
    }
  }

  // Extract and add FAQ schema if enabled and we have content blocks
  if (extractFAQs && contentBlocks && contentBlocks.length > 0 && baseUrl) {
    // Extract FAQs from content blocks
    const faqs = extractFAQsFromBlocks(contentBlocks)

    // Only add FAQ schema if we found FAQs
    if (faqs.length > 0) {
      // Check if we already have a FAQ schema
      const hasFAQSchema = schemas.some(
        (schema) => hasType(schema) && schema['@type'] === 'FAQPage',
      )

      // Only add if no FAQ schema already exists
      if (!hasFAQSchema) {
        const faqSchema = generateFAQSchema(faqs, {
          siteSettings,
          baseUrl,
        })
        schemas.push(faqSchema)
      }
    }
  }

  // Deduplicate schemas by type (keep the first occurrence of each type)
  const uniqueSchemas = deduplicateSchemas(schemas)

  // Create the combined schema with @graph
  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': uniqueSchemas,
  }

  // Render the schema markup
  return (
    <SchemaMarkup item={combinedSchema} baseUrl={baseUrl} tenantId={tenantId} domain={domain} />
  )
}

/**
 * Deduplicate schemas by type
 *
 * If multiple schemas of the same @type exist, keep only the first one
 */
function deduplicateSchemas(schemas: SchemaItem[]): SchemaItem[] {
  const typeMap = new Map<string, SchemaItem>()

  schemas.forEach((schema) => {
    if (!schema || typeof schema !== 'object') return

    // Get the schema type if available
    if (hasType(schema)) {
      const schemaType = schema['@type']

      // Skip if no type or already exists
      if (!schemaType || typeMap.has(schemaType)) return

      // Add to map
      typeMap.set(schemaType, schema)
    }
  })

  // Return as array
  return Array.from(typeMap.values())
}

export default SchemaOrganizer
