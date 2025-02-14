'use server'

import configPromise from '@payload-config'
import { getPayload, PaginatedDocs } from 'payload'
import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next/types'
import { CollectionArchive } from '@/components/CollectionArchive'
import { Service } from '@/payload-types'
import { getTenantFromDomain } from '@/utilities/getTenant'
import PageClient from './page.client'

export default async function Page() {
  const tenant = await getTenantFromDomain()
  const payload = await getPayload({ config: configPromise })

  if (!tenant) notFound()

  let services: PaginatedDocs<Service> | null = null

  if (tenant) {
    services = await payload.find({
      collection: 'services',
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
      {services && <CollectionArchive items={services} type="service" />}
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Payload Website Template Services`,
  }
}
