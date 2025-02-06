import { link } from '@/fields/link'
import {
  FieldGroupOptions,
  createFieldGroup,
} from '@/utilities/createFieldGroup'
import { GroupField } from 'payload'
import { z } from 'zod'

/**
 * Gallery field schemas
 */
export const gallerySchemas = {
  /** Title schema */
  title: z.string().describe('The gallery title'),
  /** Description schema */
  description: z.string().describe('The gallery description'),
  /** Link schema */
  link: z.string().describe('Gallery button link'),
  /** Image schema */
  image: z.object({}).describe('Gallery image'),
  /** Card schema */
  card: z.object({
    title: z.string().describe('Card title'),
    excerpt: z.string().describe('Card description'),
    link: z.string().describe('Card link'),
    image: z.object({}).describe('Card image'),
  }),
}

/**
 * Basic fields configuration
 */
const basicFields = {
  title: {
    name: 'title',
    type: 'text',
    required: true,
    admin: {
      description: 'Gallery title',
    },
  },
  description: {
    name: 'description',
    type: 'textarea',
    admin: {
      description: 'Gallery description',
    },
  },
  link: link({
    overrides: {
      admin: {
        description: 'Gallery button',
      },
    },
  }),
} as const

/**
 * Media fields configuration
 */
const mediaFields = {
  image: {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'Gallery image',
    },
  },
} as const

/**
 * Card fields configuration
 */
const cardFields = {
  title: {
    name: 'title',
    type: 'text',
    required: true,
    admin: {
      description: 'Card title (max 20 characters)',
    },
  },
  excerpt: {
    name: 'excerpt',
    type: 'textarea',
    required: true,
    admin: {
      description: 'Card description (max 100 characters)',
    },
  },
  link: link({
    overrides: {
      admin: {
        description: 'Card link',
      },
    },
  }),
  image: {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'Card image',
    },
  },
} as const

/**
 * Combine all gallery fields for the field group
 */
const galleryFields = {
  ...basicFields,
  ...mediaFields,
} as const

/**
 * Export all field groups for type safety
 */
export { basicFields, cardFields, mediaFields }

/**
 * Create a custom gallery field with selected fields
 * @param options - Field group configuration options
 * @returns - Gallery field configuration
 */
export function createGalleryField(
  options: Omit<FieldGroupOptions<typeof galleryFields>, 'name' | 'fields'>
): GroupField {
  return createFieldGroup({
    name: 'gallery',
    fields: galleryFields,
    ...options,
    admin: {
      description: 'Gallery section fields',
      ...options.admin,
    },
  })
}
