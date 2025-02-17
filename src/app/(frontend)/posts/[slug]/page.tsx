import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import type { Metadata } from 'next'
import { draftMode, headers } from 'next/headers'
import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import { PostHero } from '@/heros/components/PostHero'
import type { Post } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/posts/' + slug

  // Get tenant from domain
  const headersList = headers()
  const host = (await headersList).get('host') || ''
  const domain = host.split(':')[0]

  let post: Post | null = null
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
    // Then query the post with both slug and tenant
    post = await queryPostBySlugAndTenant({ slug, tenantId: tenant.id })
  }

  if (!post) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PostHero item={post} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={post.relatedPosts.filter((post): post is Post => typeof post === 'object')}
            />
          )}
        </div>
      </div>
    </article>
  )
}

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
  const post = tenant
    ? await queryPostBySlugAndTenant({
        slug,
        tenantId: tenant.id,
      })
    : null

  const meta = generateMeta({ doc: post })

  // Add robots meta tag if noindex is true
  if (post?.meta?.noindex) {
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

const queryPostBySlugAndTenant = cache(
  async ({ slug, tenantId }: { slug: string; tenantId: string }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'posts',
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
    })

    return result.docs?.[0] || null
  },
)
