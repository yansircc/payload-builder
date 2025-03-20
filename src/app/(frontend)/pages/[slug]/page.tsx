import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import SchemaMarkup from '@/components/SchemaMarkup'
import { generateMeta } from '@/utilities/generateMeta'
import { getSiteSettingsFromDomain } from '@/utilities/getSiteSettings'
import { getServerSideURL } from '@/utilities/getURL'
import { generateOrganizationSchema, generateWebPageSchema } from '@/utilities/schema'

interface Args {
  params: Promise<{ slug: string }>
}

// Generate metadata function
export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const headersList = headers()
  const host = (await headersList).get('host') || ''
  const domain = host.split(':')[0]

  const payload = await getPayload({ config: configPromise })
  const tenantQuery = await payload.find({
    collection: 'tenants',
    where: {
      domain: {
        equals: domain,
      },
    },
  })

  const tenant = tenantQuery.docs[0]
  const page = tenant
    ? await payload
        .find({
          collection: 'pages',
          where: {
            and: [
              {
                fullPath: {
                  equals: slug,
                },
              },
              {
                tenant: {
                  equals: tenant.id,
                },
              },
            ],
          },
          depth: 1,
        })
        .then((result) => result.docs[0] || null)
    : null

  const meta = generateMeta({ doc: page || null })

  // Add robots meta tag if noindex is true
  if (page?.meta?.noindex) {
    return {
      ...meta,
      robots: {
        index: false,
        follow: true,
      },
    }
  }

  return meta
}

// Page component with schema implementation
export default async function Page({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise
  const headersList = headers()
  const host = (await headersList).get('host') || ''
  const domain = host.split(':')[0]

  const payload = await getPayload({ config: configPromise })
  const tenantQuery = await payload.find({
    collection: 'tenants',
    where: {
      domain: {
        equals: domain,
      },
    },
  })

  const tenant = tenantQuery.docs[0]
  const page = tenant
    ? await payload
        .find({
          collection: 'pages',
          where: {
            and: [
              {
                fullPath: {
                  equals: slug,
                },
              },
              {
                tenant: {
                  equals: tenant.id,
                },
              },
            ],
          },
          depth: 1,
        })
        .then((result) => result.docs[0])
    : null

  if (!page) {
    return notFound()
  }

  // Generate schema for the page
  const siteSettings = await getSiteSettingsFromDomain()
  const baseUrl = getServerSideURL()

  // Create basic webpage schema
  const pageSchema = generateWebPageSchema(page, { siteSettings, baseUrl })

  // Add organization schema
  const orgSchema = generateOrganizationSchema({ siteSettings, baseUrl })

  // Combine schemas
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [pageSchema, orgSchema],
  }

  return (
    <main className="page">
      <SchemaMarkup jsonLd={jsonLd} />
      {/* Content rendering would normally be done here */}
      {/* For now we'll just render a placeholder */}
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
        {page.layout && Array.isArray(page.layout) && (
          <div>
            {/* Content blocks would be rendered here */}
            <p>Content blocks: {page.layout.length}</p>
          </div>
        )}
      </div>
    </main>
  )
}
