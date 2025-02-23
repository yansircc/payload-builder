import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { SiteSetting } from '@/payload-types'
import { getTenantFromCookie, getTenantFromDomain } from './getTenant'

export async function getSiteSettingsFromDomain() {
  try {
    const payload = await getPayload({ config: configPromise })

    const tenant = await getTenantFromDomain()

    if (!tenant) return null

    // Get site settings for the tenant
    const siteSettings = await payload.find({
      collection: 'site-settings',
      where: {
        tenant: {
          equals: tenant.id,
        },
      },
      depth: 1,
    })

    return siteSettings.docs[0] as SiteSetting | null
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

/**
 * Retrieves site settings using the tenant ID from cookie
 *
 * @description This function gets the tenant from a cookie and then fetches
 * the corresponding site settings. It's useful when you need to access site settings
 * in contexts where the tenant information is stored in a cookie.
 *
 * @returns {Promise<SiteSetting | null>} The site settings if found, null otherwise
 * @throws {Error} If there's an error fetching the site settings
 *
 * @example
 * ```typescript
 * const settings = await getSiteSettingsFromCookie()
 * if (settings) {
 *   // Use site settings
 *   console.log(settings.name)
 * }
 * ```
 */
export async function getSiteSettingsFromCookie(): Promise<SiteSetting | null> {
  try {
    const payload = await getPayload({ config: configPromise })

    const tenant = await getTenantFromCookie()

    if (!tenant) return null

    // Get site settings for the tenant
    const siteSettings = await payload.find({
      collection: 'site-settings',
      where: {
        tenant: {
          equals: tenant.id,
        },
      },
      depth: 1,
    })

    return siteSettings.docs[0] as SiteSetting | null
  } catch (error) {
    console.error('Error fetching site settings from cookie:', error)
    return null
  }
}
