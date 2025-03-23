import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import RichText from '@/components/RichText'
import SchemaMarkup from '@/components/SchemaMarkup'
import { generateMeta } from '@/utilities/generateMeta'
import { getSiteSettingsFromDomain } from '@/utilities/getSiteSettings'
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
  const { slug } = await paramsPromise
  const headersList = headers()
  const host = (await headersList).get('host') || ''
  const domain = host.split(':')[0]
  const port = host.includes(':') ? ':' + host.split(':')[1] : ''

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
          depth: 2,
        })
        .then((result) => result.docs[0])
    : null

  if (!post) {
    return notFound()
  }

  // Generate schema for the post
  const siteSettings = await getSiteSettingsFromDomain()

  // Use the tenant domain for the baseUrl
  const protocol = host.includes('localhost') ? 'http://' : 'https://'
  const baseUrl = `${protocol}${domain}${port}`

  // Create blog post schema with the correct domain
  const postSchema = generateBlogPostingSchema(post, { siteSettings, baseUrl })

  // Add organization schema with the correct domain
  const orgSchema = generateOrganizationSchema({ siteSettings, baseUrl })

  // Combine schemas
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [postSchema, orgSchema],
  }

  return (
    <article className="pt-16 pb-16">
      <SchemaMarkup item={structuredData} baseUrl={baseUrl} tenantId={tenant?.id} domain={domain} />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        {post.heroImage && (
          <div className="mb-6">
            {typeof post.heroImage === 'object' && post.heroImage.url && (
              <Image
                src={post.heroImage.url}
                alt={post.heroImage.alt || post.title}
                className="w-full h-auto rounded-lg"
                width={post.heroImage.width || 1200}
                height={post.heroImage.height || 630}
              />
            )}
          </div>
        )}
        {post.content && (
          <div className="mt-8">
            <RichText data={post.content} enableGutter={false} enableProse={true} />
          </div>
        )}
      </div>
    </article>
  )
}
