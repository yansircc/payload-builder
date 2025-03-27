import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Thing, WithContext } from 'schema-dts'
import React, { cache } from 'react'
import type { Metadata } from 'next'
import { draftMode, headers } from 'next/headers'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Media } from '@/components/Media'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import SchemaOrganizer from '@/components/SchemaOrganizer'
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
import { generateServiceSchema } from '@/utilities/schema'
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

  // Prepare schemas array
  const schemas: WithContext<Thing>[] = []

  // Safely access structuredData field
  const structuredData = service.structuredData || {}

  const disableGlobalSchema = structuredData.disableGlobalSchema === true
  // Check extractFAQs setting (default to true if not explicitly set to false)
  const extractFAQs = structuredData.extractFAQs !== false

  // Add service schema
  const serviceSchema = generateServiceSchema(service, { siteSettings, baseUrl })
  schemas.push(serviceSchema)

  // Collect all blocks that might contain FAQs
  const contentBlocks = [
    ...(service.content ? [service.content] : []),
    // Include specifications if they exist and have a structure that might contain FAQs
    ...(service.specifications && Array.isArray(service.specifications)
      ? service.specifications
      : []),
  ]

  return (
    <article className="pt-16 pb-16">
      <SchemaOrganizer
        items={schemas}
        baseUrl={baseUrl}
        tenantId={tenant?.id}
        domain={domain}
        siteSettings={siteSettings}
        disableGlobalSchema={disableGlobalSchema}
        contentBlocks={contentBlocks}
        extractFAQs={extractFAQs}
      />
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
      pagination: false,
      overrideAccess: draft,
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
    })

    return result.docs?.[0] || null
  },
)
