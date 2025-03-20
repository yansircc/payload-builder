import type { Page, Post } from '@/payload-types'
import type { ExtendedPage, ExtendedPost } from '@/types/payload-extended'

// Type that can be either the original or extended type
type AnyPost = Post | ExtendedPost
type AnyPage = Page | ExtendedPage

/**
 * Auto-detects the most appropriate schema.org type for a page or post
 */
export function autoDetectSchemaType(doc: AnyPost | AnyPage): string {
  // Default values
  const defaultPageType = 'WebPage'
  const defaultPostType = 'BlogPosting'

  // If it's a post, default to BlogPosting
  if ('populatedAuthors' in doc) {
    return defaultPostType
  }

  // If page has FAQs, it might be an FAQ page
  if ('layout' in doc && Array.isArray(doc.layout)) {
    // Check if the page has FAQ blocks
    const hasFAQBlock = doc.layout.some((block: any) => block.blockType?.toLowerCase() === 'faq')

    if (hasFAQBlock) {
      return 'FAQPage'
    }
  }

  // If the page is in a "products" section or has product references, it might be a product page
  if (doc.slug && typeof doc.slug === 'string' && doc.slug.includes('product')) {
    return 'Product'
  }

  // Default to WebPage for pages
  return defaultPageType
}

/**
 * Gets the schema type for a document, either from the specified type or auto-detected
 */
export function getSchemaType(doc: AnyPost | AnyPage): string {
  // For docs with structuredData field
  const extendedDoc = doc as ExtendedPost | ExtendedPage

  // Check if document has a specified schema type
  if (extendedDoc.structuredData?.type && extendedDoc.structuredData.type !== 'auto') {
    return extendedDoc.structuredData.type
  }

  // Auto-detect schema type
  return autoDetectSchemaType(doc)
}
