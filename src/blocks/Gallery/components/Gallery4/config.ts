import type { GroupField } from 'payload/dist/fields/config/types'
import { z } from 'zod'
import { createGalleryField, gallerySchemas } from '../shared/base-field'

/**
 * Gallery 4 field validation and type definitions
 */
export const schemas = {
  title: gallerySchemas.title,
  items: z.array(
    z.object({
      title: z.string().describe('Item title'),
      description: z.string().describe('Item description'),
      image: z.any().describe('Item image'),
      href: z.string().describe('Item link'),
    }),
  ),
}

/**
 * Complete configuration for Gallery 4
 */
export const gallery4Fields: GroupField = {
  name: 'gallery-4',
  interfaceName: 'Gallery4Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'A carousel gallery with image cards and descriptions',
  },
  fields: [
    createGalleryField({
      includeFields: ['title'],
      arrays: [
        {
          name: 'items',
          label: 'Gallery Items',
          minRows: 1,
          maxRows: 12,
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Item title',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Item description',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Item image',
              },
            },
            {
              name: 'href',
              type: 'text',
              required: true,
              admin: {
                description: 'Item link URL',
              },
            },
          ],
          admin: {
            description: 'Gallery items (1-12)',
          },
        },
      ],
    }),
  ],
}
