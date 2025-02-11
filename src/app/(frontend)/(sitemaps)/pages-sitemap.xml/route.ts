import config from '@payload-config'
import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { headers } from 'next/headers'
import { Tenant } from '@/payload-types'

const getPagesSitemap = unstable_cache(
  async (tenant: Tenant, protocol: string) => {
    const payload = await getPayload({ config })

    const SITE_URL = `${protocol}://${tenant.domain}`

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const defaultSitemap = [
      {
        loc: `${SITE_URL}/search`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/posts`,
        lastmod: dateFallback,
      },
    ]

    const sitemap = results.docs
      ? results.docs
          .filter((page) => Boolean(page?.slug))
          .map((page) => {
            return {
              loc: page?.slug === 'home' ? `${SITE_URL}/` : `${SITE_URL}/${page?.slug}`,
              lastmod: page.updatedAt || dateFallback,
            }
          })
      : []

    return [...defaultSitemap, ...sitemap]
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const payload = await getPayload({ config })

  // Get tenant from domain
  const headersList = headers()
  const host = (await headersList).get('host') || ''
  const domain = host.split(':')[0]
  const protocol = (await headersList).get('x-forwarded-proto') || 'http' // Default to 'http' if not set

  // First, find the tenant by domain
  const tenantQuery = await payload.find({
    collection: 'tenants',
    where: {
      domain: {
        equals: domain,
      },
    },
  })

  const tenant = tenantQuery.docs[0]

  if (tenant) {
    const sitemap = await getPagesSitemap(tenant, protocol)
    return getServerSideSitemap(sitemap)
  }

  return null
}
