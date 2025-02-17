import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import type { Metadata } from 'next'
import { draftMode, headers } from 'next/headers'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { RenderHero } from '@/heros/RenderHero'
import type { Page as PageType } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      fullPath: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.fullPath !== 'home'
    })
    .map(({ fullPath }) => {
      // Convert fullPath to segments array
      // e.g., "home/about-us" becomes ["home", "about-us"]
      const segments = fullPath?.split('/') || []
      return { segments }
    })

  return params
}

type Args = {
  params: Promise<{
    segments?: string[]
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { segments = ['home'] } = await paramsPromise

  // Convert segments array back to fullPath
  // If no segments, default to 'home'
  const fullPath = segments.join('/')
  const url = '/' + fullPath

  // Get tenant from domain
  const headersList = headers()
  const host = (await headersList).get('host') || ''
  const domain = host.split(':')[0]

  let page: PageType | null = null
  const payload = await getPayload({ config: configPromise })

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
    // Then query the page with both fullPath and tenant
    page = await queryPageByFullPathAndTenant({
      fullPath,
      tenantId: tenant.id,
    })
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article>
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { segments = ['home'] } = await paramsPromise
  const fullPath = segments.join('/')
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
    ? await queryPageByFullPathAndTenant({
        fullPath,
        tenantId: tenant.id,
      })
    : null

  const meta = generateMeta({ doc: page })

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

const queryPageByFullPathAndTenant = cache(
  async ({ fullPath, tenantId }: { fullPath: string; tenantId: string }) => {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      where: {
        and: [
          {
            fullPath: {
              equals: fullPath,
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
