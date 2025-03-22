import { Thing, WithContext } from 'schema-dts'

// Types
type JsonLdData = WithContext<Thing> | Record<string, any> | string

interface JsonLdProps<T extends Thing = Thing> {
  item: JsonLdData | JsonLdData[]
  baseUrl?: string
  tenantId?: string
}

// Resolve base URL from various sources - server-side only
function resolveBaseUrl(providedUrl?: string, tenantId?: string): string | undefined {
  // Explicit URL takes precedence
  if (providedUrl) return providedUrl

  // Tenant-specific URL sources
  if (tenantId) {
    // From environment variables
    const tenantEnvVar = `NEXT_PUBLIC_TENANT_${tenantId.toUpperCase()}_URL`
    if (process.env?.[tenantEnvVar]) {
      return process.env[tenantEnvVar]
    }
  }

  // Global environment variable
  if (process.env?.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }

  return undefined
}

// Process JSON-LD data to fix common issues
function processJsonLd(data: JsonLdData | JsonLdData[], baseUrl?: string): Record<string, any> {
  // Handle string input
  if (typeof data === 'string') {
    try {
      return processJsonLd(JSON.parse(data), baseUrl)
    } catch {
      return { '@context': 'https://schema.org', '@type': 'WebSite', description: data }
    }
  }

  // Clone to avoid mutations
  const processedData = JSON.parse(JSON.stringify(data))
  const result = Array.isArray(processedData) ? processedData : processedData

  // Fix @graph items
  if (result['@graph'] && Array.isArray(result['@graph'])) {
    result['@graph'] = result['@graph'].map((item: Record<string, any>) => {
      // Remove duplicate @context
      if (item['@context'] && result['@context']) delete item['@context']

      // Fix URLs
      return fixUrls(item, baseUrl)
    })
  } else {
    // Fix URLs in non-graph object
    fixUrls(result, baseUrl)
  }

  // Ensure required fields
  const safeData: Record<string, any> = {
    '@context': 'https://schema.org',
    ...result,
  }

  // Ensure it has @type if missing
  if (!safeData['@type'] && !safeData['@graph']) {
    safeData['@type'] = 'WebSite'
  }

  return safeData
}

// Fix relative URLs in JSON-LD object
function fixUrls(obj: Record<string, any>, baseUrl?: string): Record<string, any> {
  if (!baseUrl || !obj) return obj

  for (const key in obj) {
    // Fix URL fields
    if (
      typeof obj[key] === 'string' &&
      (key === 'url' || key === 'image' || key === '@id') &&
      obj[key] &&
      obj[key].startsWith('/')
    ) {
      obj[key] = `${baseUrl}${obj[key]}`
    }
    // Handle nested structures
    else if (typeof obj[key] === 'object' && obj[key] !== null) {
      if (Array.isArray(obj[key])) {
        obj[key] = obj[key].map((item: Record<string, any>) =>
          typeof item === 'object' ? fixUrls(item, baseUrl) : item,
        )
      } else {
        fixUrls(obj[key], baseUrl)
      }
    }
  }

  return obj
}

/**
 * Server-rendered Schema.org structured data component
 * Renders JSON-LD script tag directly
 *
 * @example
 * ```tsx
 * <SchemaJsonLd item={data} />
 * ```
 */
export function SchemaJsonLd<T extends Thing = Thing>({ item, baseUrl, tenantId }: JsonLdProps<T>) {
  // Skip client-side processing with useMemo
  const resolvedUrl = resolveBaseUrl(baseUrl, tenantId)

  // Skip if no data
  if (!item) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('SchemaJsonLd: No data provided. Please check the item prop.')
    }
    return null
  }

  // Process the data
  const processedData = processJsonLd(item, resolvedUrl)

  // Convert to JSON string with proper formatting
  const jsonString = JSON.stringify(
    processedData,
    null,
    process.env.NODE_ENV === 'development' ? 2 : 0,
  )

  // Return script tag with JSON-LD data
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonString }} />
}

export default SchemaJsonLd
