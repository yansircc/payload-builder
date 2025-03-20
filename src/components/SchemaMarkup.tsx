'use client'

import { FC, useMemo } from 'react'

interface SchemaMarkupProps {
  jsonLd: Record<string, any> | Record<string, any>[] | string
  baseUrl?: string // Optional base URL for overriding the default from settings
  tenantId?: string // Optional tenant identifier for multi-tenant environments
}

// Helper to get the base URL from settings or environment
function getBaseUrl(providedUrl?: string, tenantId?: string): string | undefined {
  // Return the provided URL if it exists
  if (providedUrl) return providedUrl

  // Try to get tenant-specific URL if tenant ID is provided
  if (tenantId) {
    // Try to get from tenant-specific environment variables
    const tenantEnvVar = `NEXT_PUBLIC_TENANT_${tenantId.toUpperCase()}_URL`
    if (typeof process !== 'undefined' && process.env?.[tenantEnvVar]) {
      return process.env[tenantEnvVar]
    }

    // Try to get from tenant-specific local storage (client-side only)
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTenantUrl = localStorage.getItem(`tenant_${tenantId}_url`)
      if (storedTenantUrl) return storedTenantUrl
    }
  }

  // Try to get the global URL from environment variables
  if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }

  // In the browser, try to get from window.location
  if (typeof window !== 'undefined') {
    const { protocol, host, pathname } = window.location

    // For path-based multi-tenant setups
    if (tenantId && pathname.includes(`/${tenantId}`)) {
      // If the URL contains tenantId as a path segment, use the base domain
      return `${protocol}//${host}`
    }

    // For subdomain-based multi-tenant setups
    if (tenantId && host.startsWith(`${tenantId}.`)) {
      // If the host is a subdomain matching tenantId, use that
      return `${protocol}//${host}`
    }

    // For custom domain multi-tenant setups, check localStorage for domain mapping
    if (tenantId && window.localStorage) {
      const customDomain = localStorage.getItem(`tenant_${tenantId}_domain`)
      if (customDomain) {
        return `${protocol}//${customDomain}`
      }
    }

    // Default fallback: use current protocol and host
    return `${protocol}//${host}`
  }

  return undefined
}

/**
 * Validates and transforms JSON-LD data:
 * - Removes duplicate @context declarations inside @graph
 * - Converts relative URLs to absolute URLs
 * - Handles empty URLs appropriately
 */
function validateJsonLd(
  jsonLd: Record<string, any> | Record<string, any>[],
  baseUrl?: string,
): Record<string, any> {
  // Clone the object to avoid mutating the original
  const processedJsonLd = JSON.parse(JSON.stringify(jsonLd))

  // If it's a graph structure, process each item
  if (processedJsonLd['@graph'] && Array.isArray(processedJsonLd['@graph'])) {
    processedJsonLd['@graph'] = processedJsonLd['@graph'].map((item: Record<string, any>) => {
      // Remove duplicate @context inside graph items
      if (item['@context'] && processedJsonLd['@context']) {
        delete item['@context']
      }

      return transformUrls(item, baseUrl)
    })
  } else {
    // Process the object directly if it's not a graph
    transformUrls(processedJsonLd, baseUrl)
  }

  return processedJsonLd
}

/**
 * Recursively transforms relative URLs to absolute URLs
 */
function transformUrls(obj: Record<string, any>, baseUrl?: string): Record<string, any> {
  if (!baseUrl) return obj

  for (const key in obj) {
    if (
      typeof obj[key] === 'string' &&
      (key === 'url' || key === 'image' || key === '@id') &&
      obj[key] &&
      obj[key].startsWith('/')
    ) {
      // Convert relative URL to absolute
      obj[key] = `${baseUrl}${obj[key]}`
    } else if (key === 'logo' && typeof obj[key] === 'object') {
      // Handle logo object
      transformUrls(obj[key], baseUrl)
    } else if (key === 'author' && Array.isArray(obj[key])) {
      // Handle author array
      obj[key] = obj[key].map((author: Record<string, any>) => transformUrls(author, baseUrl))
    } else if (key === 'author' && typeof obj[key] === 'object') {
      // Handle author object
      transformUrls(obj[key], baseUrl)
    } else if (key === 'mainEntityOfPage' && typeof obj[key] === 'object') {
      // Handle mainEntityOfPage object
      transformUrls(obj[key], baseUrl)
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      // Recursively process nested objects
      transformUrls(obj[key], baseUrl)
    }
  }

  return obj
}

/**
 * Renders JSON-LD structured data in a script tag
 *
 * Usage:
 * ```tsx
 * // With explicit URL
 * <SchemaMarkup
 *   jsonLd={jsonLdData}
 *   baseUrl="https://yourwebsite.com"
 * />
 *
 * // Using environment settings
 * <SchemaMarkup jsonLd={jsonLdData} />
 *
 * // For multi-tenant apps
 * <SchemaMarkup jsonLd={jsonLdData} tenantId="tenant1" />
 * ```
 */
const SchemaMarkup: FC<SchemaMarkupProps> = ({ jsonLd, baseUrl, tenantId }) => {
  const resolvedBaseUrl = useMemo(() => getBaseUrl(baseUrl, tenantId), [baseUrl, tenantId])

  const processedJsonLd = useMemo(() => {
    if (!resolvedBaseUrl) {
      console.warn(
        'SchemaMarkup: No base URL could be resolved. URLs will not be transformed to absolute URLs.',
      )
    }

    if (typeof jsonLd === 'string') {
      try {
        const parsed = JSON.parse(jsonLd)
        return JSON.stringify(validateJsonLd(parsed, resolvedBaseUrl))
      } catch (e) {
        // If parsing fails, return the original string
        return jsonLd
      }
    }

    return JSON.stringify(validateJsonLd(jsonLd, resolvedBaseUrl))
  }, [jsonLd, resolvedBaseUrl])

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: processedJsonLd }} />
}

export default SchemaMarkup
