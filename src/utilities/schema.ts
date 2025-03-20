import {
  BlogPosting,
  FAQPage,
  Organization,
  Product,
  Question,
  WebPage,
  WithContext,
} from 'schema-dts'
import type { Page, Post, SiteSetting } from '@/payload-types'
import type { ExtendedPage, ExtendedPost } from '@/types/payload-extended'
import { getImageURL } from './getImageURL'

export interface SchemaOptions {
  siteSettings: SiteSetting | null
  baseUrl: string
}

// Blog post schema (Article)
export function generateBlogPostingSchema(
  post: Post | ExtendedPost,
  options: SchemaOptions,
): WithContext<BlogPosting> {
  const { siteSettings, baseUrl } = options
  const url = `${baseUrl}/${post.slug}`
  const categories =
    post.categories?.map((cat) => (typeof cat === 'object' ? cat.title : '')).filter(Boolean) || []

  // Get author information
  const authors = Array.isArray(post.populatedAuthors)
    ? post.populatedAuthors.map((author) => ({
        '@type': 'Person' as const,
        name: author.name || '',
        url: `${baseUrl}/author/${author.id || ''}`,
      }))
    : []

  // Get hero image
  let image = post.heroImage
    ? getImageURL(typeof post.heroImage === 'object' ? post.heroImage : { id: post.heroImage })
    : null

  // Use meta image as fallback
  if (!image && post.meta?.image) {
    image = getImageURL(
      typeof post.meta.image === 'object' ? post.meta.image : { id: post.meta.image },
    )
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    name: post.title,
    description: post.meta?.description || '',
    datePublished: post.publishedAt || undefined,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    author: authors.length ? authors : undefined,
    publisher: {
      '@type': 'Organization',
      name: siteSettings?.title || '',
      logo: {
        '@type': 'ImageObject',
        url: siteSettings?.siteIdentity?.logo
          ? getImageURL(
              typeof siteSettings.siteIdentity.logo === 'object'
                ? siteSettings.siteIdentity.logo
                : { id: siteSettings.siteIdentity.logo },
            ) || ''
          : '',
      },
    },
    image: image || undefined,
    url,
    ...(categories.length > 0 && { keywords: categories.join(', ') }),
  }
}

// Page schema (WebPage)
export function generateWebPageSchema(
  page: Page | ExtendedPage,
  options: SchemaOptions,
): WithContext<WebPage> {
  const { siteSettings, baseUrl } = options
  const url = `${baseUrl}/${page.slug}`

  // Get hero image if available
  let image = null

  // Get image from hero if available
  if (page.hero && typeof page.hero === 'object') {
    // Handle various hero structures that might have different image field names
    const heroObject = page.hero as any
    const heroMedia = heroObject.image || heroObject.media || null

    if (heroMedia) {
      image = getImageURL(typeof heroMedia === 'object' ? heroMedia : { id: heroMedia })
    }
  }

  // Use meta image as fallback
  if (!image && page.meta?.image) {
    image = getImageURL(
      typeof page.meta.image === 'object' ? page.meta.image : { id: page.meta.image },
    )
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.meta?.description || '',
    datePublished: page.publishedAt || undefined,
    dateModified: page.updatedAt,
    url,
    image: image || undefined,
    isPartOf: {
      '@type': 'WebSite',
      name: siteSettings?.title || '',
      url: baseUrl,
    },
  }
}

// Product schema
export function generateProductSchema(product: any, options: SchemaOptions): WithContext<Product> {
  const { baseUrl } = options
  const url = `${baseUrl}/products/${product.slug}`

  // Get product image
  let image = product.heroImage
    ? getImageURL(
        typeof product.heroImage === 'object' ? product.heroImage : { id: product.heroImage },
      )
    : null

  // Use meta image as fallback
  if (!image && product.meta?.image) {
    image = getImageURL(
      typeof product.meta.image === 'object' ? product.meta.image : { id: product.meta.image },
    )
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.meta?.description || '',
    image: image || undefined,
    url,
    // Add additional product details here
  }
}

// FAQ Schema
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
  options: SchemaOptions,
): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })) as Question[],
  }
}

// Organization schema
export function generateOrganizationSchema(options: SchemaOptions): WithContext<Organization> {
  const { siteSettings, baseUrl } = options

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteSettings?.title || '',
    url: baseUrl,
    logo: siteSettings?.siteIdentity?.logo
      ? getImageURL(
          typeof siteSettings.siteIdentity.logo === 'object'
            ? siteSettings.siteIdentity.logo
            : { id: siteSettings.siteIdentity.logo },
        ) || undefined
      : undefined,
    description: siteSettings?.description || '',
  }
}

// Extract FAQs from page content blocks
export function extractFAQsFromBlocks(blocks: any[]): Array<{ question: string; answer: string }> {
  const faqs: Array<{ question: string; answer: string }> = []

  if (!blocks || !Array.isArray(blocks)) return faqs

  blocks.forEach((block) => {
    if (block.blockType === 'faq') {
      // Extract FAQs based on the specific FAQ structure
      const faqItems = block.faqItems || []
      faqItems.forEach((item: any) => {
        if (item.question && item.answer) {
          faqs.push({
            question: item.question,
            answer: item.answer,
          })
        }
      })
    }
  })

  return faqs
}

// Combine multiple schemas into one
export function combineSchemas(schemas: WithContext<any>[]): string {
  if (schemas.length === 1) {
    return JSON.stringify(schemas[0])
  }

  // If multiple schemas, wrap them in a @graph
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': schemas,
  })
}
