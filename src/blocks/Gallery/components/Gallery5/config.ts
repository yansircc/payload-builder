import { link } from '@/fields/link'
import type { Field, GroupField } from 'payload'
import { z } from 'zod'
import { createGalleryField, gallerySchemas } from '../shared/base-field'

/**
 * Gallery 5 field validation and type definitions
 */
export const schemas = {
  title: gallerySchemas.title,
  description: gallerySchemas.description,
  links: z.array(gallerySchemas.link).min(1).max(1),
  items: z
    .array(
      z.object({
        title: z.string().describe('Item title'),
        description: z.string().describe('Item description'),
        image: z.any().describe('Item image'),
        href: z.string().describe('Item link'),
      }),
    )
    .describe('Gallery items'),
}

const itemFields: Field[] = [
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
      description: 'Item link',
    },
  },
]

/**
 * Complete configuration for Gallery 5
 */
export const gallery5Fields: GroupField = {
  name: 'gallery-5',
  interfaceName: 'Gallery5Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Gallery 5 - Carousel with tabs and image/content layout',
  },
  fields: [
    createGalleryField({
      includeFields: ['title', 'description'],
      arrays: [
        {
          name: 'links',
          fields: [
            link({
              overrides: {
                defaultValue: {
                  suffixIcon: 'ArrowRight',
                },
              },
            }),
          ],
          admin: {
            description: 'CTA Button',
          },
          minRows: 1,
          maxRows: 1,
        },
        {
          name: 'items',
          fields: itemFields,
          minRows: 1,
          maxRows: 10,
          admin: {
            description: 'Gallery items (1-10)',
          },
        },
      ],
    }),
  ],
}
