import { GroupField } from 'payload'
import { z } from 'zod'
import { cardFields, createGalleryField, gallerySchemas } from '../shared/base-field'

/**
 * Gallery 6 field validation and type definitions
 */
export const schemas = {
  title: gallerySchemas.title,
  link: gallerySchemas.link,
  cards: z.array(gallerySchemas.card).min(3).max(6),
}

/**
 * Complete configuration for Gallery 6
 */
export const gallery6Fields: GroupField = {
  name: 'gallery-6',
  interfaceName: 'Gallery6Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Gallery with title, description and card grid',
  },
  fields: [
    createGalleryField({
      includeFields: ['title', 'link'],
      arrays: [
        {
          name: 'cards',
          fields: Object.values(cardFields),
          minRows: 3,
          maxRows: 6,
          admin: {
            description: 'Gallery cards (3-6)',
          },
        },
      ],
    }),
  ],
}
