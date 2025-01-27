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
  /** Icon schema */
  icon: z.string().describe('Lucide icon name'),
  /** Image schema */
  image: z.object({}).describe('Feature image'),
  /** Primary button schema */
  primaryButton: z.object({
    icon: z.string().describe('Button icon name'),
    label: z.string().describe('Button label'),
  }),
  /** Secondary button schema */
  secondaryButton: z.object({
    label: z.string().describe('Button label'),
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
    required: true,
    admin: {
      description: 'Lucide icon name (e.g., MessagesSquare)',
    },
  },
}

/**
 * Button fields configuration
 */
const buttonFields: Record<string, GroupField> = {
  primaryButton: {
    name: 'primaryButton',
    type: 'group',
    fields: [
      {
        name: 'icon',
        type: 'text',
        required: true,
        admin: {
          description: 'Button icon name (e.g., Play)',
        },
      },
      {
        name: 'label',
        type: 'text',
        required: true,
        admin: {
          description: 'Button text',
        },
      },
    ],
  },
  secondaryButton: {
    name: 'secondaryButton',
    type: 'group',
    fields: [
      {
        name: 'label',
        type: 'text',
        required: true,
        admin: {
          description: 'Button text',
        },
      },
    ],
  },
}

/**
 * Combine all feature fields for the field group
 */
const featureFields: Record<string, Field> = {
  ...basicFields,
  ...mediaFields,
  ...iconFields,
  ...buttonFields,
}

/**
 * Export all field groups for type safety
 */
export { basicFields, buttonFields, iconFields, mediaFields }

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
