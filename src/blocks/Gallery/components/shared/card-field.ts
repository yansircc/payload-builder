import { link } from '@/fields/link'
import { Field, GroupField } from 'payload'
import { z } from 'zod'

/**
 * Gallery card field configuration
 */
export const galleryCardFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    defaultValue: 'Natural Language Processing',
    required: true,
  },
  {
    name: 'excerpt',
    type: 'text',
    required: true,
    defaultValue:
      'Advanced AI algorithms that understand and process human language, enabling seamless communication between users and machines through text and speech.',
  },
  link({
    overrides: {
      admin: {
        description: 'A related link address',
      },
    },
  }),
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
]

/**
 * Gallery card field validation and type definitions
 */
export const schemas = {
  /** Title field: A short and powerful title */
  title: z.string().describe('A short and powerful title, max 20 characters'),
  /** Description field: Detailed description text */
  excerpt: z
    .string()
    .describe(
      'A detailed description text, in English, max 100 characters, include exclamation marks to add emotion',
    ),
  /** Link field: Related link */
  link: z.string().describe('A related link address'),
}

/**
 * Complete configuration for Gallery card
 */
export const galleryCard: GroupField = {
  name: 'gallery-card',
  type: 'group',
  fields: galleryCardFields,
}
