import type { CollectionConfig } from 'payload'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          tenant: typeof data?.tenant === 'string' ? data.tenant : '',
          collection: 'posts',
          req,
        })

        return path
      },
    },
    preview: (data: any, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        tenant: typeof data?.tenant.id === 'string' ? data.tenant.id : '',
        collection: 'services',
        req,
      }),
    useAsTitle: 'title',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'richText', required: true },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'additionalImages',
      type: 'array',
      label: 'Additional Images',
      labels: { singular: 'Image', plural: 'Images' },
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: false }],
    },
    {
      name: 'specifications',
      type: 'array',
      label: 'Specifications',
      labels: { singular: 'Specification', plural: 'Specifications' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'text', required: true },
      ],
      minRows: 0,
    },
  ],
  timestamps: true,
}
