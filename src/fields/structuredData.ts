/**
 * Schema/structured data field configuration
 * This field allows users to manually configure structured data for pages and posts
 *
 * Schema.org structured data helps search engines understand your content
 * and can lead to rich results in search engine result pages (SERPs)
 */
export const structuredDataField = {
  name: 'structuredData',
  type: 'group' as const,
  admin: {
    description: 'Configure structured data (schema.org) for this content',
    position: 'sidebar' as const,
  },
  fields: [
    {
      name: 'type',
      type: 'select' as const,
      admin: {
        description: 'Select the primary schema type for this content',
      },
      options: [
        {
          label: 'Auto (Default) - Intelligently selects schema based on content',
          value: 'auto',
        },
        {
          label: 'Article / Blog Post - For articles with authors and dates',
          value: 'BlogPosting',
        },
        {
          label: 'Web Page - For general content pages',
          value: 'WebPage',
        },
        {
          label: 'Product - For product listings with details',
          value: 'Product',
        },
        {
          label: 'FAQ Page - For question and answer content',
          value: 'FAQPage',
        },
        {
          label: 'Manual JSON-LD - Custom schema markup',
          value: 'manual',
        },
      ],
      defaultValue: 'auto',
      required: true,
    },
    {
      name: 'manualSchema',
      type: 'code' as const,
      admin: {
        language: 'json',
        description: 'Manually enter JSON-LD schema data',
        condition: (data: Record<string, unknown>, siblingData: Record<string, unknown>) =>
          siblingData?.type === 'manual',
      },
    },
    {
      name: 'disableGlobalSchema',
      type: 'checkbox' as const,
      admin: {
        description: 'Disable global organization schema on this page',
        condition: (data: Record<string, unknown>, siblingData: Record<string, unknown>) =>
          siblingData?.type !== 'auto',
      },
      defaultValue: false,
    },
    {
      name: 'extractFAQs',
      type: 'checkbox' as const,
      admin: {
        description:
          'Enable FAQ schema extraction from content. Create FAQs using dedicated FAQ blocks (recommended) or with H3 headings followed by paragraph text in the rich text editor (avoid empty paragraphs between Q&A pairs).',
        condition: (data: Record<string, unknown>, siblingData: Record<string, unknown>) =>
          siblingData?.type === 'auto' || siblingData?.type === 'FAQPage',
      },
      defaultValue: true,
    },
  ],
}
