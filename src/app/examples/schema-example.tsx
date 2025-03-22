'use client'

import { useEffect, useMemo, useState } from 'react'
import { SchemaJsonLd } from '@/components/SchemaMarkup'
import type { Page, Post, SiteSetting } from '@/payload-types'
import {
  combineSchemas,
  extractFAQsFromBlocks,
  generateBlogPostingSchema,
  generateFAQSchema,
  generateOrganizationSchema,
  generateWebPageSchema,
} from '@/utilities/schema'

interface SchemaExampleProps {
  post?: Post
  page?: Page
  siteSettings?: SiteSetting
}

export default function SchemaExample({ post, page, siteSettings }: SchemaExampleProps) {
  // Get the base URL for the current tenant
  const [baseUrl, setBaseUrl] = useState<string>('')

  useEffect(() => {
    setBaseUrl(window.location.origin)
  }, [])

  // Generate schema based on content
  const schema = useMemo(() => {
    if (!baseUrl) return null

    const options = { siteSettings: siteSettings || null, baseUrl }
    const schemas = []

    // Always include organization schema
    schemas.push(generateOrganizationSchema(options))

    // Page-specific schemas
    if (page) {
      schemas.push(generateWebPageSchema(page, options))

      // Check for FAQs in page content
      const faqs = extractFAQsFromBlocks(page.layout || [])
      if (faqs.length > 0) {
        schemas.push(generateFAQSchema(faqs, options))
      }
    }

    // Blog post schema
    if (post) {
      schemas.push(generateBlogPostingSchema(post, options))
    }

    return combineSchemas(schemas)
  }, [post, page, siteSettings, baseUrl])

  // Only render when schema data is available
  if (!schema) return null

  return <SchemaJsonLd item={schema} />
}
