'use server'

import configPromise from '@payload-config'
import { getPayload, PaginatedDocs } from 'payload'
import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next/types'
import { CollectionArchive } from '@/components/CollectionArchive'
import { getTenantFromDomain } from '@/utilities/getTenant'
import PageClient from './page.client'

interface Args {
  params: {
    slug: string
  }
}

export default async function Page({ params: paramsPromise }: Args) {
  const tenant = await getTenantFromDomain()
  const payload = await getPayload({ config: configPromise })
  const { slug = '' } = await paramsPromise

  if (!tenant) notFound()

  // First find the author by username
  const authors = await payload.find({
    collection: 'users',
    where: {
      or: [
        {
          id: {
            equals: slug,
          },
        },
        {
          username: {
            equals: slug,
          },
        },
      ],
    },
    limit: 1,
  })

  const author = authors.docs[0]
  if (!author) notFound()

  // Then find posts by this author
  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    where: {
      and: [
        {
          tenant: {
            equals: tenant.id,
          },
        },
        {
          authors: {
            contains: author.id,
          },
        },
      ],
    },
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      content: true,
      updatedAt: true,
      createdAt: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <h1 className="text-4xl font-bold mb-8">Posts by {author.username}</h1>
      <PageClient />
      {posts && <CollectionArchive items={posts} type="post" />}
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const tenant = await getTenantFromDomain()
  const payload = await getPayload({ config: configPromise })
  const { slug = '' } = await paramsPromise

  if (!tenant) return { title: 'Author Not Found' }

  const authors = await payload.find({
    collection: 'users',
    where: {
      and: [
        {
          or: [
            {
              username: {
                equals: slug,
              },
            },
            {
              id: {
                equals: slug,
              },
            },
          ],
        },
        {
          'tenants.tenant': {
            equals: tenant.id,
          },
        },
      ],
    },
    limit: 1,
  })

  const author = authors.docs[0]
  if (!author) return { title: 'Author Not Found' }

  return {
    title: `Posts by ${author.username}`,
    description: `Browse all posts written by ${author.username}`,
  }
}
