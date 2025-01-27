import { link } from '@/fields/link'
import { createFieldGroup, FieldGroupOptions } from '@/utilities/createFieldGroup'
import { Field, GroupField } from 'payload'
import { z } from 'zod'

/**
 * Atomic feature field schemas
 */
export const featureSchemas = {
  /** Title schema */
  title: z.string().describe('The feature title text'),
  /** Description schema */
  description: z.string().describe('The feature description text'),
  /** Icon schema (optional) */
  icon: z.string().optional().describe('Optional: Lucide icon name'),
  /** Image schema */
  image: z.object({}).describe('Feature image'),
  /** Link schema */
  link: z.object({
    type: z.enum(['reference', 'custom']).optional(),
    newTab: z.boolean().optional(),
    reference: z
      .object({
        relationTo: z.enum(['pages', 'posts']),
        value: z.string(),
      })
      .optional(),
    url: z.string().optional(),
    label: z.string(),
    prefixIcon: z.string().optional(),
    suffixIcon: z.string().optional(),
  }),
  /** Testimonial schema */
  testimonial: z.object({
    quote: z.string().describe('Testimonial quote text'),
    name: z.string().describe('Author name'),
    role: z.string().describe('Author role or position'),
    company: z.string().describe('Author company'),
    image: z.object({}).optional().describe('Author profile image'),
  }),
  card: z.array(
    z.object({
      icon: z.string().optional(),
      title: z.string(),
      description: z.string(),
      image: z.string().optional(),
    }),
  ),
}

/**
 * Basic fields configuration
 */
const basicFields: Record<string, Field> = {
  title: {
    name: 'title',
    type: 'text',
    required: true,
    admin: {
      description: 'Main heading text',
    },
  },
  description: {
    name: 'description',
    type: 'textarea',
    required: true,
    admin: {
      description: 'Feature description text',
    },
  },
  link: link({
    overrides: {
      admin: {
        description: 'Feature button',
      },
    },
  }),
}

/**
 * Media fields configuration
 */
const mediaFields: Record<string, Field> = {
  image: {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'Feature image',
    },
  },
}

/**
 * Icon fields configuration
 */
const iconFields: Record<string, Field> = {
  icon: {
    name: 'icon',
    type: 'text',
    required: false,
    admin: {
      description: 'Optional: Lucide icon name (e.g., MessagesSquare)',
    },
  },
}

/**
 * Card fields for card-based layouts
 */
const cardsFields = {
  icon: {
    name: 'icon',
    type: 'text',
    required: false,
    admin: {
      description: 'Lucide icon name',
    },
  },
  title: {
    name: 'title',
    type: 'text',
    required: true,
    admin: {
      description: 'Feature title',
    },
  },
  description: {
    name: 'description',
    type: 'textarea',
    required: true,
    admin: {
      description: 'Feature description',
    },
  },
  image: {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: false,
    admin: {
      description: 'Feature image',
    },
  },
} as const

/**
 * Testimonial fields configuration
 */
const testimonialFields = {
  quote: {
    name: 'quote',
    type: 'textarea',
    required: true,
    admin: {
      description: 'Testimonial quote text',
    },
  },
  name: {
    name: 'name',
    type: 'text',
    required: true,
    admin: {
      description: 'Author name',
    },
  },
  role: {
    name: 'role',
    type: 'text',
    required: true,
    admin: {
      description: 'Author role or position',
    },
  },
  company: {
    name: 'company',
    type: 'text',
    required: true,
    admin: {
      description: 'Author company',
    },
  },
  image: {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: false,
    admin: {
      description: 'Author profile image',
    },
  },
} as const

/**
 * Combine all feature fields for the field group
 */
const featureFields: Record<string, Field> = {
  ...basicFields,
  ...mediaFields,
  ...iconFields,
  ...cardsFields,
  ...testimonialFields,
}

/**
 * Export all field groups for type safety
 */
export { basicFields, cardsFields, iconFields, mediaFields, testimonialFields }

/**
 * Create a custom feature field with selected fields, array fields and groups
 * @param options - Field group configuration options
 * @returns - Feature field configuration
 */
export function createFeatureField(
  options: Omit<FieldGroupOptions<typeof featureFields>, 'name' | 'fields'>,
): GroupField {
  return createFieldGroup({
    name: 'feature',
    fields: featureFields,
    ...options,
    admin: {
      description: 'Feature section fields',
      ...options.admin,
    },
  })
}
