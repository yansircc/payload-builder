import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { WithContext } from 'schema-dts'
import React, { cache } from 'react'
import type { Metadata } from 'next'
import { draftMode, headers } from 'next/headers'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Media } from '@/components/Media'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import SchemaMarkup from '@/components/SchemaMarkup'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PostHero } from '@/heros/components/PostHero'
// import { ServiceHero } from '@/heros/components/ServiceHero'
import type { Service } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { getSiteSettingsFromDomain } from '@/utilities/getSiteSettings'
import { getTenantFromDomain } from '@/utilities/getTenant'
import {
  generateBlogPostingSchema,
  generateOrganizationSchema,
  generateProductSchema,
  generateServiceSchema,
  generateWebPageSchema,
} from '@/utilities/schema'
import PageClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const services = await payload.find({
    collection: 'services',
    draft: false,
    limit: 1000,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = services.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Service({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/services/' + slug
  const tenant = await getTenantFromDomain()
  const headersList = headers()
  const host = (await headersList).get('host') || ''
  const domain = host.split(':')[0]
  const port = host.includes(':') ? ':' + host.split(':')[1] : ''

  let service: Service | null = null

  if (tenant) {
    // Then query the service with both slug and tenant
    service = await queryServiceBySlugAndTenant({ slug, tenantId: tenant.id })
  }

  if (!service) return <PayloadRedirects url={url} />

  // Generate schema for the service
  const siteSettings = await getSiteSettingsFromDomain()

  // Use the tenant domain for the baseUrl
  const protocol = host.includes('localhost') ? 'http://' : 'https://'
  const baseUrl = `${protocol}${domain}${port}`

  // Initialize schemas array
  const schemas: WithContext<any>[] = []

  // Safely access structuredData field
  const serviceData = service as any
  const structuredData = serviceData.structuredData || {}
  const schemaType = structuredData.type || 'auto'

  if (schemaType === 'auto') {
    // Default schema for this content type
    const serviceSchema = generateServiceSchema(service, { siteSettings, baseUrl })
    schemas.push(serviceSchema)

    // Add organization schema by default for auto
    const orgSchema = generateOrganizationSchema({ siteSettings, baseUrl })
    schemas.push(orgSchema)
  } else if (schemaType === 'manual' && structuredData.manualSchema) {
    // For manual schema, use the provided JSON-LD
    try {
      const manualSchema = JSON.parse(structuredData.manualSchema)
      schemas.push(manualSchema)
    } catch (error) {
      console.error('Error parsing manual schema:', error)
    }

    // Add organization schema unless disabled
    if (!structuredData.disableGlobalSchema) {
      const orgSchema = generateOrganizationSchema({ siteSettings, baseUrl })
      schemas.push(orgSchema)
    }
  } else {
    // For specific schema types
    let contentSchema: any

    switch (schemaType) {
      case 'WebPage':
        contentSchema = generateWebPageSchema(service as any, { siteSettings, baseUrl })
        break
      case 'BlogPosting':
        contentSchema = generateBlogPostingSchema(service as any, { siteSettings, baseUrl })
        break
      case 'Product':
        contentSchema = generateProductSchema(service as any, { siteSettings, baseUrl })
        break
      default:
        contentSchema = generateServiceSchema(service, { siteSettings, baseUrl })
        break
    }

    schemas.push(contentSchema)

    // Add organization schema unless disabled
    if (!structuredData.disableGlobalSchema) {
      const orgSchema = generateOrganizationSchema({ siteSettings, baseUrl })
      schemas.push(orgSchema)
    }
  }

  // Combine schemas
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': schemas,
  }

  return (
    <article className="pt-16 pb-16">
      <SchemaMarkup item={schemaData} baseUrl={baseUrl} tenantId={tenant?.id} domain={domain} />
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PostHero item={service} />

      <div className="flex flex-col items-center gap-8 pt-8">
        <div className="container">
          <RichText className="max-w-[48rem] mx-auto" data={service.content} enableGutter={false} />
        </div>

        {/* Specifications Table */}
        {service.specifications && service.specifications.length > 0 && (
          <div className="max-w-[48rem] w-full">
            <h2 className="mb-6 text-2xl font-semibold">Specifications</h2>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Feature</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {service.specifications.map((spec, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{spec.name}</TableCell>
                      <TableCell>{spec.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        )}

        {/* Additional Images Gallery */}
        {service.serviceImages && service.serviceImages.length > 0 && (
          <div className="max-w-[48rem] w-full">
            <h2 className="mb-6 text-2xl font-semibold">Service Gallery</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {service.serviceImages.map((image, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    {image && typeof image !== 'string' && (
                      <Media
                        resource={image}
                        size="100vw"
                        className="aspect-video w-full object-cover"
                      />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const tenant = await getTenantFromDomain()

  const service = tenant
    ? await queryServiceBySlugAndTenant({
        slug,
        tenantId: tenant.id,
      })
    : null

  const meta = generateMeta({ doc: service })

  // Add robots meta tag if noindex is true
  if (service?.meta?.noindex) {
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
const queryServiceBySlugAndTenant = cache(
  async ({ slug, tenantId }: { slug: string; tenantId: string }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'services',
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            tenant: {
              equals: tenantId,
            },
          },
        ],
      },
      depth: 2,
      select: {
        title: true,
        slug: true,
        content: true,
        meta: true,
        heroImage: true,
        serviceImages: true,
        specifications: true,
        categories: true,
        structuredData: true,
        updatedAt: true,
        createdAt: true,
        publishedAt: true,
      },
    })

    return result.docs?.[0] || null
  },
)
