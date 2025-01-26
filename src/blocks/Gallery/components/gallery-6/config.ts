import { link } from '@/fields/link'
import { Field, GroupField } from 'payload'
import { z } from 'zod'
import { galleryCardFields } from '../shared/card-field'

/**
 * Field configuration for Gallery 6
 */
export const fields: Field[] = [
  {
    name: 'cards',
    type: 'array',
    label: 'Gallery Cards',
    minRows: 1,
    maxRows: 6,
    fields: galleryCardFields,
    admin: {
      description: 'Max 6 cards',
      initCollapsed: false,
    },
  },
]

/**
 * Gallery card field validation and type definitions
 */
export const schemas = {
  heading: z.string().describe('A short and powerful title, max 20 characters'),
  galleryLink: z.string().describe('A related link address'),
  cards: z
    .array(
      z.object({
        /** Title field: A short and powerful title */
        title: z.string().describe('A short and powerful title, max 20 characters'),
        /** Excerpt field: Detailed description text */
        excerpt: z
          .string()
          .describe(
            'A detailed description text, in Chinese, max 100 characters, include exclamation marks to add emotion',
          ),
        /** Link field: Related link */
        link: z.string().describe('A related link address'),
        /** Image field */
        image: z.string(),
      }),
    )
    .min(1)
    .max(6),
}

/**
 * Complete configuration for Gallery 6
 */
export const gallery6Fields: GroupField = {
  name: 'gallery-6',
  interfaceName: 'Gallery6Fields',
  label: false,
  type: 'group',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Gallery',
      admin: {
        description: 'A short and powerful title, max 20 characters',
      },
    },
    link({
      overrides: {
        name: 'galleryLink',
        label: 'Gallery Link',
        admin: {
          description: 'A related link address',
        },
      },
    }),
    ...fields,
  ],
}
