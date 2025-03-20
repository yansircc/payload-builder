import { Page, Post } from '@/payload-types'

/**
 * Extended Post type including structuredData field
 */
export interface ExtendedPost extends Post {
  structuredData: {
    type: 'auto' | 'BlogPosting' | 'WebPage' | 'Product' | 'FAQPage' | 'manual'
    manualSchema?: string | null
    disableGlobalSchema?: boolean | null
    extractFAQs?: boolean | null
  }
}

/**
 * Extended Page type including structuredData field
 */
export interface ExtendedPage extends Page {
  structuredData: {
    type: 'auto' | 'BlogPosting' | 'WebPage' | 'Product' | 'FAQPage' | 'manual'
    manualSchema?: string | null
    disableGlobalSchema?: boolean | null
    extractFAQs?: boolean | null
  }
}
