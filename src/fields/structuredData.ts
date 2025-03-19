/**
 * Schema/structured data field configuration
 * This field allows users to manually configure structured data for pages and posts
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
          label: 'Auto (Default)',
          value: 'auto',
        },
        {
          label: 'Article / Blog Post',
          value: 'BlogPosting',
        },
        {
          label: 'Web Page',
          value: 'WebPage',
        },
        {
          label: 'Product',
          value: 'Product',
        },
        {
          label: 'FAQ Page',
          value: 'FAQPage',
        },
        {
          label: 'Manual JSON-LD',
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
        description: 'Automatically extract FAQs from page content',
        condition: (data: Record<string, unknown>, siblingData: Record<string, unknown>) =>
          siblingData?.type === 'auto' || siblingData?.type === 'FAQPage',
      },
      defaultValue: true,
    },
  ],
}
