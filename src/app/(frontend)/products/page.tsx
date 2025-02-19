'use server'

import configPromise from '@payload-config'
import { getPayload, PaginatedDocs } from 'payload'
import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next/types'
import { CollectionArchive } from '@/components/CollectionArchive'
import { Product } from '@/payload-types'
import { getTenantFromDomain } from '@/utilities/getTenant'
import PageClient from './page.client'

export default async function Page() {
  const tenant = await getTenantFromDomain()
  const payload = await getPayload({ config: configPromise })

  if (!tenant) notFound()

  let products: PaginatedDocs<Product> | null = null

  if (tenant) {
    products = await payload.find({
      collection: 'products',
      depth: 1,
      limit: 12,
      overrideAccess: false,
      select: {
        title: true,
        description: true,
        slug: true,
        categories: true,
        meta: true,
        content: true,
        updatedAt: true,
        createdAt: true,
      },
      where: {
        tenant: {
          equals: tenant.id,
        },
        _status: {
          equals: 'published',
        },
      },
    })
  }

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      {products && <CollectionArchive items={products} type="product" />}
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Payload Website Template Products`,
  }
}
