import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Thing, WithContext } from 'schema-dts'

// Types
type JsonLdData = WithContext<Thing> | Record<string, any> | string
type BaseUrlOptions = {
  providedUrl?: string
  tenantId?: string
  domain?: string
}

interface JsonLdProps<T extends Thing = Thing> {
  item: JsonLdData | JsonLdData[]
  baseUrl?: string
  tenantId?: string
  domain?: string
}

/**
 * Resolves the base URL from various sources - server-side only
 * Prioritizes: providedUrl > domain > tenant database lookup > environment variables
 */
async function resolveBaseUrl({
  providedUrl,
  tenantId,
  domain,
}: BaseUrlOptions): Promise<string | undefined> {
  // Explicit URL or domain takes precedence
  if (providedUrl) return providedUrl
  if (domain) return `https://${domain}`

  // Tenant-specific database lookup if tenantId is provided
  if (tenantId) {
    try {
      // Try to get the tenant domain from the database
      const payload = await getPayload({ config: configPromise })
      const tenant = await payload.findByID({
        collection: 'tenants',
        id: tenantId,
      })

      if (tenant?.domain) {
        return `https://${tenant.domain}`
      }
    } catch (error) {
      // Silently fail and continue to environment variables
      console.error('Error fetching tenant domain:', error)
    }

    // From environment variables
    const tenantEnvVar = `NEXT_PUBLIC_TENANT_${tenantId.toUpperCase()}_URL`
    if (process.env?.[tenantEnvVar]) {
      return process.env[tenantEnvVar]
    }
  }

  // Global environment variable
  return process.env?.NEXT_PUBLIC_SITE_URL
}

/**
 * Handles string JSON-LD input by parsing it safely
 */
function handleStringInput(data: string, baseUrl?: string): Record<string, any> {
  try {
    return processJsonLd(JSON.parse(data), baseUrl)
  } catch {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      description: data,
    }
  }
}

/**
 * Processes JSON-LD graph array if present
 */
function processGraphItems(data: Record<string, any>, baseUrl?: string): Record<string, any> {
  if (data['@graph'] && Array.isArray(data['@graph'])) {
    data['@graph'] = data['@graph'].map((item: Record<string, any>) => {
      // Remove duplicate @context
      if (item['@context'] && data['@context']) delete item['@context']
      // Fix URLs
      return fixUrls(item, baseUrl)
    })
  } else {
    // Fix URLs in non-graph object
    fixUrls(data, baseUrl)
  }

  return data
}

/**
 * Process JSON-LD data to fix common issues
 */
function processJsonLd(data: JsonLdData | JsonLdData[], baseUrl?: string): Record<string, any> {
  // Handle string input
  if (typeof data === 'string') {
    return handleStringInput(data, baseUrl)
  }

  // Clone to avoid mutations
  const processedData = JSON.parse(JSON.stringify(data))
  const result = Array.isArray(processedData) ? processedData : processedData

  // Process @graph items or fix URLs directly
  processGraphItems(result, baseUrl)

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

/**
 * Fix relative URLs in JSON-LD object
 */
function fixUrls(obj: Record<string, any>, baseUrl?: string): Record<string, any> {
  if (!baseUrl || !obj) return obj

  for (const key in obj) {
    // Fix URL fields
    if (
      typeof obj[key] === 'string' &&
      (key === 'url' || key === 'image' || key === '@id' || key === 'logo') &&
      obj[key] &&
      obj[key].startsWith('/')
    ) {
      obj[key] = `${baseUrl}${obj[key]}`
    }
    // Handle image arrays - common in Product schema
    else if (key === 'image' && Array.isArray(obj[key])) {
      obj[key] = obj[key].map((imageUrl: string) =>
        typeof imageUrl === 'string' && imageUrl.startsWith('/')
          ? `${baseUrl}${imageUrl}`
          : imageUrl,
      )
    }
    // Handle nested structures
    else if (typeof obj[key] === 'object' && obj[key] !== null) {
      if (Array.isArray(obj[key])) {
        obj[key] = obj[key].map((item: Record<string, any> | string) =>
          typeof item === 'object'
            ? fixUrls(item, baseUrl)
            : // Also fix string URLs in arrays
              typeof item === 'string' && item.startsWith('/')
              ? `${baseUrl}${item}`
              : item,
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
export async function SchemaJsonLd<T extends Thing = Thing>({
  item,
  baseUrl,
  tenantId,
  domain,
}: JsonLdProps<T>) {
  // Skip if no data
  if (!item) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('SchemaJsonLd: No data provided. Please check the item prop.')
    }
    return null
  }

  // Resolve URL with tenant domain support
  const resolvedUrl = await resolveBaseUrl({ providedUrl: baseUrl, tenantId, domain })

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
