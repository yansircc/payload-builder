'use client'

import { useEffect, useMemo, useState } from 'react'
import SchemaOrganizer from '@/components/SchemaOrganizer'
import type { Page, Post, SiteSetting } from '@/payload-types'
import {
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
  const schemas = useMemo(() => {
    if (!baseUrl) return []

    const options = { siteSettings: siteSettings || null, baseUrl }
    const schemaItems = []

    // Always include organization schema
    schemaItems.push(generateOrganizationSchema(options))

    // Page-specific schemas
    if (page) {
      schemaItems.push(generateWebPageSchema(page, options))

      // Check for FAQs in page content
      const faqs = extractFAQsFromBlocks(page.layout || [])
      if (faqs.length > 0) {
        schemaItems.push(generateFAQSchema(faqs, options))
      }
    }

    // Blog post schema
    if (post) {
      schemaItems.push(generateBlogPostingSchema(post, options))
    }

    return schemaItems
  }, [post, page, siteSettings, baseUrl])

  // Only render when schema data is available
  if (!baseUrl || schemas.length === 0) return null

  return <SchemaOrganizer items={schemas} baseUrl={baseUrl} />
}
