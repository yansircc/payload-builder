import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next/types'
import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { getTenantFromDomain } from '@/utilities/getTenant'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })
  const tenant = await getTenantFromDomain()

  if (!tenant) return notFound

  const products = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      content: true,
      updatedAt: true,
      createdAt: true,
    },
    where: {
      domain: {
        equals: tenant.domain,
      },
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Products</h1>
        </div>
      </div>

      <div className="container mb-8">
        {/* <PageRange
          collection="products"
          currentPage={products.page}
          limit={12}
          totalDocs={products.totalDocs}
        /> */}
      </div>

      <CollectionArchive items={products.docs} type="product" />

      <div className="container">
        {products.totalPages > 1 && products.page && (
          <Pagination page={products.page} totalPages={products.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Products`,
  }
}
