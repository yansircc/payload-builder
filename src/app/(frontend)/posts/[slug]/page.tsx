import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import SchemaMarkup from '@/components/SchemaMarkup'
import { generateMeta } from '@/utilities/generateMeta'
import { getSiteSettingsFromDomain } from '@/utilities/getSiteSettings'
import { getServerSideURL } from '@/utilities/getURL'
import { generateBlogPostingSchema, generateOrganizationSchema } from '@/utilities/schema'

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
  const post = tenant
    ? await payload
        .find({
          collection: 'posts',
          where: {
            and: [
              {
                slug: {
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

  const meta = generateMeta({ doc: post || null })

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

// Post component with schema implementation
export default async function Post({ params: paramsPromise }: Args) {
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
    ? await payload
        .find({
          collection: 'posts',
          where: {
            and: [
              {
                slug: {
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

  if (!post) {
    return notFound()
  }

  // Generate schema for the post
  const siteSettings = await getSiteSettingsFromDomain()
  const baseUrl = getServerSideURL()

  // Create basic blog post schema
  const postSchema = generateBlogPostingSchema(post, { siteSettings, baseUrl })

  // Add organization schema
  const orgSchema = generateOrganizationSchema({ siteSettings, baseUrl })

  // Combine schemas
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [postSchema, orgSchema],
  }

  return (
    <article className="pt-16 pb-16">
      <SchemaMarkup jsonLd={jsonLd} />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        {post.heroImage && (
          <div className="mb-6">
            <p>Featured image</p>
          </div>
        )}
        {post.content && (
          <div className="prose max-w-none">
            <p>Post content</p>
          </div>
        )}
      </div>
    </article>
  )
}
