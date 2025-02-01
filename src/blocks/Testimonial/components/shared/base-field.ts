import { ArrayField, Field, GroupField } from 'payload'
import { z } from 'zod'

// 1. Add schema definition
export const testimonialSchemas = {
  /** Author name schema */
  authorName: z.string().describe('The name of the testimonial author'),
  /** Author role schema */
  authorRole: z.string().describe('The role/position of the author'),
  /** Author company schema */
  authorCompany: z.string().describe('The company of the author'),
  /** Author image schema */
  authorImage: z.any().describe('The author profile image'),
  /** Quote schema */
  quote: z.string().describe('The testimonial quote text'),
  /** Rating schema */
  rating: z.number().min(1).max(5).describe('Rating out of 5 stars'),
}

// 2. Add field configuration
export const basicFields = {
  authorName: {
    name: 'authorName',
    type: 'text',
    required: true,
    admin: {
      description: 'Name of the testimonial author',
    },
  },
  authorRole: {
    name: 'authorRole',
    type: 'text',
    admin: {
      description: 'Role/position of the author',
    },
  },
  authorCompany: {
    name: 'authorCompany',
    type: 'text',
    admin: {
      description: 'Company of the author',
    },
  },
  authorImage: {
    name: 'authorImage',
    type: 'upload',
    relationTo: 'media',
    admin: {
      description: 'Author profile image',
    },
  },
  quote: {
    name: 'quote',
    type: 'textarea',
    required: true,
    admin: {
      description: 'Testimonial quote text',
    },
  },
  rating: {
    name: 'rating',
    type: 'number',
    min: 1,
    max: 5,
    admin: {
      description: 'Rating out of 5 stars',
    },
  },
} as const

type BasicFieldKeys = keyof typeof basicFields

export function createTestimonialField({
  includeFields = [],
  arrays = [],
  groups = [],
}: {
  includeFields?: BasicFieldKeys[]
  arrays?: Array<{
    name: string
    fields: Field[]
    minRows?: number
    maxRows?: number
    admin?: {
      description?: string
    }
  }>
  groups?: Array<{
    name: string
    fields: BasicFieldKeys[]
    admin?: {
      description?: string
    }
  }>
} = {}): { fields: Field[] } {
  return {
    fields: [
      ...includeFields.map((field) => basicFields[field] as Field),
      ...arrays.map(
        (array): ArrayField => ({
          name: array.name,
          type: 'array',
          fields: array.fields,
          minRows: array.minRows,
          maxRows: array.maxRows,
          admin: array.admin,
        }),
      ),
      ...groups.map(
        (group): GroupField => ({
          name: group.name,
          type: 'group',
          fields: group.fields.map((field) => basicFields[field] as Field),
          admin: group.admin,
        }),
      ),
    ],
  }
}
