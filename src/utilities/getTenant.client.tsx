'use client'

import type { Where } from 'payload'
import { stringify } from 'qs'
import { env } from '@/env'
import type { Tenant } from '@/payload-types'
import { getClientSideURL } from '@/utilities/getClientSideURL'

interface TenantResponse {
  docs?: Tenant[]
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
 * Retrieves tenant information from the client side using the existing Payload API
 *
 * @description This function fetches tenant data based on the current hostname.
 * It uses the same API endpoint as other client-side components for consistency.
 *
 * @param {Object} options - Optional configuration
 * @param {number} options.revalidate - Cache revalidation time in seconds (default: 3600)
 * @param {string[]} options.tags - Cache tags for revalidation (default: ['tenant-theme'])
 * @returns {Promise<Tenant | null>} The tenant object if found, null otherwise
 *
 * @example
 * ```typescript
 * const tenant = await getTenantByDomainFromClient()
 * if (tenant) {
 *   console.log(tenant.name)
 * }
 * ```
 */
export async function getTenantByDomainFromClient({
  revalidate = 3600,
  tags = ['tenant-theme'],
}: {
  revalidate?: number
  tags?: string[]
} = {}): Promise<Tenant | null> {
  try {
    const hostname = window.location.hostname
    const query: Where = {
      domain: {
        equals: hostname,
      },
    }

    const stringifiedQuery = stringify(
      {
        where: query,
      },
      { addQueryPrefix: true },
    )

    const response = await fetch(`${env.NEXT_PUBLIC_SERVER_URL}/api/tenants${stringifiedQuery}`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate, tags },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch tenant')
    }

    const data = (await response.json()) as TenantResponse

    return data.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching tenant from client side:', error)
    return null
  }
}

/**
 * Retrieves a specific tenant by ID from the client side
 *
 * @description This function fetches tenant data for a specific tenant ID.
 * It uses the Payload API directly from the client side.
 *
 * @param {string} id - The ID of the tenant to fetch
 * @param {Object} options - Optional configuration
 * @param {number} options.revalidate - Cache revalidation time in seconds (default: 3600)
 * @param {string[]} options.tags - Cache tags for revalidation (default: ['tenant-theme'])
 * @returns {Promise<Tenant | null>} The tenant object if found, null otherwise
 *
 * @example
 * ```typescript
 * const tenantId = '123'
 * const tenant = await getTenantByIdFromClient(tenantId)
 * if (tenant) {
 *   console.log(tenant.name)
 * }
 * ```
 */
export async function getTenantByIdFromClient(
  id: string,
  {
    revalidate = 3600,
    tags = ['tenant-theme'],
  }: {
    revalidate?: number
    tags?: string[]
  } = {},
): Promise<Tenant | null> {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_SERVER_URL}/api/tenants/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate, tags },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch tenant')
    }

    const tenant = (await response.json()) as Tenant
    return tenant || null
  } catch (error) {
    console.error('Error fetching tenant by ID from client side:', error)
    return null
  }
}
