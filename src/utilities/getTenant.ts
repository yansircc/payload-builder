import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cookies, headers } from 'next/headers'
import type { Tenant } from '@/payload-types'

/**
 * Retrieves the tenant based on the current domain from request headers
 *
 * @description This function extracts the domain from the request headers and queries the database
 * to find the corresponding tenant. It's typically used in server components and API routes
 * to determine the current tenant context.
 *
 * @returns {Promise<Tenant | null>} The tenant object if found, null otherwise
 * @throws {Error} If there's an error fetching the tenant data
 *
 * @example
 * ```typescript
 * const tenant = await getTenantFromDomain()
 * if (tenant) {
 *   // Use tenant data
 *   console.log(tenant.name)
 * }
 * ```
 */
export async function getTenantFromDomain(): Promise<Tenant | null> {
  const headersList = await headers()
  try {
    const payload = await getPayload({ config: configPromise })
    const host = headersList.get('host') || ''
    const domain = host.split(':')[0]

    const tenantQuery = await payload.find({
      collection: 'tenants',
      where: {
        domain: {
          equals: domain,
        },
      },
      limit: 1,
    })

    return (tenantQuery.docs[0] as Tenant) || null
  } catch (error) {
    console.error('Error fetching tenant:', error)
    return null
  }
}

/**
 * Retrieves a tenant by its ID
 *
 * @description This function queries the database to find a tenant using its unique identifier.
 * It's useful when you need to fetch tenant information in contexts where you already have the tenant ID.
 *
 * @param {string} id - The unique identifier of the tenant
 * @returns {Promise<Tenant | null>} The tenant object if found, null otherwise
 * @throws {Error} If there's an error fetching the tenant data
 *
 * @example
 * ```typescript
 * const tenantId = 'abc123'
 * const tenant = await getTenantById(tenantId)
 * if (tenant) {
 *   // Use tenant data
 *   console.log(tenant.name)
 * }
 * ```
 */
export async function getTenantById(id: string): Promise<Tenant | null> {
  try {
    const payload = await getPayload({ config: configPromise })

    const tenantQuery = await payload.findByID({
      collection: 'tenants',
      id,
    })

    return (tenantQuery as Tenant) || null
  } catch (error) {
    console.error('Error fetching tenant by ID:', error)
    return null
  }
}

/**
 * Retrieves a tenant from a cookie value
 *
 * @description This function reads the tenant ID from a cookie and queries the database
 * to find the corresponding tenant. It's useful for maintaining tenant context across requests
 * without relying on domain or explicit IDs.
 *
 * @param {string} cookieName - The name of the cookie containing the tenant ID
 * @returns {Promise<Tenant | null>} The tenant object if found, null otherwise
 * @throws {Error} If there's an error fetching the tenant data
 *
 * @example
 * ```typescript
 * const tenant = await getTenantFromCookie('tenant-id')
 * if (tenant) {
 *   // Use tenant data
 *   console.log(tenant.name)
 * }
 * ```
 */
export async function getTenantFromCookie(): Promise<Tenant | null> {
  try {
    const cookieStore = await cookies()
    const tenantId = cookieStore.get('payload-tenant')?.value

    if (!tenantId) {
      return null
    }

    return getTenantById(tenantId)
  } catch (error) {
    console.error('Error fetching tenant from cookie:', error)
    return null
  }
}
