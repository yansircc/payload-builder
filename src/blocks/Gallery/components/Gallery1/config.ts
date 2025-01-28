import type { Field, GroupField } from 'payload'
import { z } from 'zod'
import { createGalleryField } from '../shared/base-field'

/**
 * Gallery 1 field validation and type definitions
 */
export const schemas = {
  items: z.array(
    z.object({
      title: z.string().describe('The title of the case study'),
      href: z.string().url().describe('The link to the case study'),
      image: z.any().describe('The main image'),
      logo: z.any().describe('The company logo'),
      company: z.string().describe('The company name'),
      badges: z.array(z.string()).describe('List of badges'),
    }),
  ),
}

const itemFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: true,
    admin: {
      description: 'Case study title',
    },
  },
  {
    name: 'href',
    type: 'text',
    required: true,
    admin: {
      description: 'Case study link',
    },
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'Main image',
    },
  },
  {
    name: 'logo',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'Company logo',
    },
  },
  {
    name: 'company',
    type: 'text',
    required: true,
    admin: {
      description: 'Company name',
    },
  },
  {
    name: 'badges',
    type: 'array',
    minRows: 1,
    maxRows: 4,
    fields: [
      {
        name: 'text',
        type: 'text',
        required: true,
      },
    ],
    admin: {
      description: 'List of badges (max 4)',
    },
  },
]

/**
 * Complete configuration for Gallery 1
 */
export const gallery1Fields: GroupField = {
  name: 'gallery-1',
  interfaceName: 'Gallery1Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Interactive case study gallery with hover effects',
  },
  fields: [
    createGalleryField({
      arrays: [
        {
          name: 'items',
          fields: itemFields,
          minRows: 1,
          maxRows: 6,
          admin: {
            description: 'Gallery items (1-6)',
          },
        },
      ],
    }),
  ],
}
