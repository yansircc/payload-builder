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
  features: z.object({
    title: z.string(),
    features: z.array(
      z.object({
        icon: z.string().optional(),
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
      }),
    ),
  }),
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
 * Feature fields for card-based layouts
 */
export const featuresFields = {
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
 * Combine all feature fields for the field group
 */
const featureFields: Record<string, Field> = {
  ...basicFields,
  ...mediaFields,
  ...iconFields,
  ...featuresFields,
}

/**
 * Export all field groups for type safety
export { basicFields, iconFields, mediaFields }
export { basicFields, iconFields, mediaFields, }

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
