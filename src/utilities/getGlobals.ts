import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Config, Footer, Header } from 'src/payload-types'
import { unstable_cache } from 'next/cache'
import { headers } from 'next/headers'

type Global = keyof Config['globals']

async function getGlobal(slug: Global, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = (slug: Global, depth = 0) =>
  unstable_cache(async () => getGlobal(slug, depth), [slug], {
    tags: [`global_${slug}`],
  })

/**
 * Retrieves the footer global configuration with populated relationships
 * @returns The footer configuration with populated relationships
 */
export async function getFooter(depth = 2): Promise<Footer | null> {
  const payload = await getPayload({ config: configPromise })
  const headersList = headers()
  const host = (await headersList).get('host') || ''
  const domain = host.split(':')[0]

  // Find tenant by domain
  const tenantQuery = await payload.find({
    collection: 'tenants',
    where: {
      domain: {
        equals: domain,
      },
    },
  })

  const tenant = tenantQuery.docs[0]

  // Get footer for this tenant
  const footerQuery = await payload.find({
    collection: 'footer',
    where: {
      tenant: {
        equals: tenant?.id,
      },
    },
    depth,
    limit: 1,
  })

  return footerQuery.docs[0] || null
}

/**
 * Retrieves the header global configuration with populated relationships
 * @returns The header configuration with populated relationships
 */ export async function getHeader(depth = 2): Promise<Header | null> {
  const payload = await getPayload({ config: configPromise })
  const headersList = headers()
  const host = (await headersList).get('host') || ''
  const domain = host.split(':')[0]

  // Find tenant by domain
  const tenantQuery = await payload.find({
    collection: 'tenants',
    where: {
      domain: {
        equals: domain,
      },
    },
  })

  const tenant = tenantQuery.docs[0]

  // Get header for this tenant
  const headerQuery = await payload.find({
    collection: 'header',
    where: {
      tenant: {
        equals: tenant?.id,
      },
    },
    depth,
    limit: 1,
  })

  return headerQuery.docs[0] || null
}
