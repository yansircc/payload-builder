import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { SiteSetting } from '@/payload-types'
import { getTenantFromDomain } from './getTenant'

export async function getSiteSettings() {
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
