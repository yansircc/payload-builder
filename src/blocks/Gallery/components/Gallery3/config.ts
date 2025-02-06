import { GroupField } from 'payload'
import { z } from 'zod'

import { createGalleryField, gallerySchemas } from '../shared/base-field'

/**
 * Gallery 3 field validation and type definitions
 */
export const schemas = {
  title: gallerySchemas.title,
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      label: z.string(),
      href: z.string().url(),
      image: gallerySchemas.image,
    })
  ),
}

/**
 * Complete configuration for Gallery 3
 */
export const gallery3Fields: GroupField = {
  name: 'gallery-3',
  interfaceName: 'Gallery3Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'A carousel gallery component with case studies or features',
  },
  fields: [
    createGalleryField({
      includeFields: ['title'],
      arrays: [
        {
          name: 'items',
          fields: [
            {
              name: 'id',
              type: 'text',
              required: true,
              admin: {
                description: 'Unique identifier for the item',
              },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Title of the case study or feature',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Description of the case study or feature',
              },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: {
                description: 'Badge label for the item',
              },
            },
            {
              name: 'href',
              type: 'text',
              required: true,
              admin: {
                description: 'Link URL for the item',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Image for the case study or feature',
              },
            },
          ],
          minRows: 1,
          maxRows: 10,
          admin: {
            description: 'List of case studies or features (1-10)',
          },
        },
      ],
    }),
  ],
}
