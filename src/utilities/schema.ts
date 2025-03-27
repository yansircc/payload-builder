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

  // Create publisher logo URL with multiple fallback options
  let publisherLogoURL = ''

  // Option 1: Use the site identity logo if available
  if (siteSettings?.siteIdentity?.logo) {
    publisherLogoURL =
      getImageURL(
        typeof siteSettings.siteIdentity.logo === 'object'
          ? siteSettings.siteIdentity.logo
          : { id: siteSettings.siteIdentity.logo },
      ) || ''
  }

  // Option 2: Use the site identity favicon if available
  if (!publisherLogoURL && siteSettings?.siteIdentity?.favicon) {
    publisherLogoURL =
      getImageURL(
        typeof siteSettings.siteIdentity.favicon === 'object'
          ? siteSettings.siteIdentity.favicon
          : { id: siteSettings.siteIdentity.favicon },
      ) || ''
  }

  // Option 3: Use the favicon (which should be a square image)
  if (!publisherLogoURL) {
    publisherLogoURL = `${baseUrl}/favicon.svg`
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
        url: publisherLogoURL,
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
  const { baseUrl, siteSettings } = options
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

  // Ensure image URL is absolute
  if (image && image.startsWith('/')) {
    image = `${baseUrl}${image}`
  }

  // Get product images array if available
  const productImages = []
  if (image) {
    productImages.push(image)
  }

  if (product.productImages && Array.isArray(product.productImages)) {
    product.productImages.forEach((img: any) => {
      if (typeof img === 'object' && img.url) {
        let imgUrl = img.url
        // Ensure the URL is absolute
        if (imgUrl.startsWith('/')) {
          imgUrl = `${baseUrl}${imgUrl}`
        }
        productImages.push(imgUrl)
      } else if (typeof img === 'string') {
        // Handle case where image is just an ID string
        const imgUrl = getImageURL({ id: img })
        if (imgUrl) {
          // Ensure the URL is absolute
          if (imgUrl.startsWith('/')) {
            productImages.push(`${baseUrl}${imgUrl}`)
          } else {
            productImages.push(imgUrl)
          }
        }
      }
    })
  }

  // Extract categories
  const categories =
    product.categories
      ?.map((cat: any) => (typeof cat === 'object' ? cat.title : ''))
      .filter(Boolean) || []

  // Extract product description - try to use clean text without HTML
  const description =
    product.meta?.description ||
    (typeof product.description === 'string' ? product.description : '')

  // Create basic product schema
  const productSchema: WithContext<Product> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description,
    image: productImages.length > 0 ? productImages : image || undefined,
    url,
    brand: {
      '@type': 'Brand' as const,
      name: siteSettings?.title || '',
    },
    category: categories.join(', '),
    offers: {
      '@type': 'Offer' as const,
      availability: 'https://schema.org/InStock',
      url,
    },
  }

  return productSchema
}

// Service schema
export function generateServiceSchema(service: any, options: SchemaOptions): WithContext<any> {
  const { baseUrl, siteSettings } = options
  const url = `${baseUrl}/services/${service.slug}`

  // Get service image
  let image = service.heroImage
    ? getImageURL(
        typeof service.heroImage === 'object' ? service.heroImage : { id: service.heroImage },
      )
    : null

  // Use meta image as fallback
  if (!image && service.meta?.image) {
    image = getImageURL(
      typeof service.meta.image === 'object' ? service.meta.image : { id: service.meta.image },
    )
  }

  // Ensure image URL is absolute
  if (image && image.startsWith('/')) {
    image = `${baseUrl}${image}`
  }

  // Get service images array if available
  const serviceImages = []
  if (image) {
    serviceImages.push(image)
  }

  if (service.serviceImages && Array.isArray(service.serviceImages)) {
    service.serviceImages.forEach((img: any) => {
      if (typeof img === 'object' && img.url) {
        let imgUrl = img.url
        // Ensure the URL is absolute
        if (imgUrl.startsWith('/')) {
          imgUrl = `${baseUrl}${imgUrl}`
        }
        serviceImages.push(imgUrl)
      } else if (typeof img === 'string') {
        // Handle case where image is just an ID string
        const imgUrl = getImageURL({ id: img })
        if (imgUrl) {
          // Ensure the URL is absolute
          if (imgUrl.startsWith('/')) {
            serviceImages.push(`${baseUrl}${imgUrl}`)
          } else {
            serviceImages.push(imgUrl)
          }
        }
      }
    })
  }

  // Extract categories
  const categories =
    service.categories
      ?.map((cat: any) => (typeof cat === 'object' ? cat.title : ''))
      .filter(Boolean) || []

  // Extract service description - try to use clean text without HTML
  const description =
    service.meta?.description ||
    (typeof service.description === 'string' ? service.description : '')

  // Create basic service schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description,
    url,
    image: serviceImages.length > 0 ? serviceImages : image || undefined,
    provider: {
      '@type': 'Organization',
      name: siteSettings?.title || '',
      url: baseUrl,
    },
    category: categories.join(', '),
  }

  return serviceSchema
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

  // Get organization logo URL
  let logoUrl = siteSettings?.siteIdentity?.logo
    ? getImageURL(
        typeof siteSettings.siteIdentity.logo === 'object'
          ? siteSettings.siteIdentity.logo
          : { id: siteSettings.siteIdentity.logo },
      )
    : undefined

  // Ensure the logo URL is absolute and not null
  if (logoUrl && logoUrl.startsWith('/')) {
    logoUrl = `${baseUrl}${logoUrl}`
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteSettings?.title || '',
    url: baseUrl,
    logo: logoUrl || undefined,
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

// For backward compatibility with string JSON-LD formats
export function schemaToString(schema: WithContext<any> | WithContext<any>[]): string {
  if (Array.isArray(schema)) {
    // Create a @graph structure for multiple schemas
    const combined = {
      '@context': 'https://schema.org',
      '@graph': schema.map((item) => {
        // Remove @context from individual items to avoid duplication
        const { '@context': _, ...rest } = item
        return rest
      }),
    }
    return JSON.stringify(combined)
  }
  return JSON.stringify(schema)
}
