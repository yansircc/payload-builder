'use client'

import type { Where } from 'payload'
import { stringify } from 'qs'
import type { SiteSetting } from '@/payload-types'
import { getClientSideURL } from '@/utilities/getClientSideURL'
import { getTenantByDomainFromClient } from './getTenant.client'

interface SiteSettingResponse {
  docs?: SiteSetting[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

/**
 * Retrieves site settings from the client side based on the current domain
 *
 * @description This function fetches site settings data based on the current hostname.
 * It first gets the tenant for the current domain, then fetches the site settings for that tenant.
 *
 * @param {Object} options - Optional configuration
 * @param {number} options.revalidate - Cache revalidation time in seconds (default: 3600)
 * @param {string[]} options.tags - Cache tags for revalidation (default: ['site-settings'])
 * @returns {Promise<SiteSetting | null>} The site settings if found, null otherwise
 *
 * @example
 * ```typescript
 * const siteSettings = await getSiteSettingsFromDomainClient()
 * if (siteSettings) {
 *   console.log(siteSettings.title)
 * }
 * ```
 */
export async function getSiteSettingsFromDomainClient({
  revalidate = 3600,
  tags = ['site-settings'],
}: {
  revalidate?: number
  tags?: string[]
} = {}): Promise<SiteSetting | null> {
  try {
    const tenant = await getTenantByDomainFromClient()

    if (!tenant) return null

    const query: Where = {
      tenant: {
        equals: tenant.id,
      },
    }

    const stringifiedQuery = stringify(
      {
        where: query,
        depth: 1,
      },
      { addQueryPrefix: true },
    )

    const response = await fetch(`${getClientSideURL()}/api/site-settings${stringifiedQuery}`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate, tags },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch site settings')
    }

    const data = (await response.json()) as SiteSettingResponse

    return data.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching site settings from client side:', error)
    return null
  }
}
