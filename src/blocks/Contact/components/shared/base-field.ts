import { createFieldGroup, FieldGroupOptions } from '@/utilities/createFieldGroup'
import { Field, GroupField } from 'payload'
import { z } from 'zod'

/**
 * Atomic contact field schemas
 */
export const contactSchemas = {
  /** Title schema */
  title: z.string().describe('The contact form title'),
  /** Subtitle schema */
  subtitle: z.string().describe('The contact form subtitle'),
  /** Description schema */
  description: z.string().describe('The contact form description'),
  /** Image schema */
  image: z.object({}).describe('Feature image'),
  /** Form field schema */
  formField: z.object({
    label: z.string().describe('Input field label'),
    placeholder: z.string().describe('Input field placeholder'),
    required: z.enum(['yes', 'no']).describe('Whether the field is required'),
    type: z
      .enum(['text', 'email', 'textarea', 'tel', 'number', 'select', 'radio'])
      .describe('Input field type'),
    options: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      )
      .optional()
      .describe('Options for select/radio fields'),
  }),
  /** Submit button schema */
  submitButton: z.object({
    label: z.string().describe('Submit button text'),
  }),
  /** List schema */
  list: z.array(
    z.object({
      icon: z.string().optional(),
      text: z.string(),
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
      description: 'Contact form title',
    },
  },
  subtitle: {
    name: 'subtitle',
    type: 'text',
    required: false,
    admin: {
      description: 'Contact form subtitle',
    },
  },
  description: {
    name: 'description',
    type: 'textarea',
    required: false,
    admin: {
      description: 'Contact form description',
    },
  },
}

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
      description: 'Media',
    },
  },
} as const

/**
 * Form fields configuration
 */
const formFields: Record<string, Field> = {
  formField: {
    name: 'formField',
    type: 'group',
    fields: [
      {
        name: 'label',
        type: 'text',
        required: true,
        admin: {
          description: 'Input field label',
        },
      },
      {
        name: 'placeholder',
        type: 'text',
        required: true,
        admin: {
          description: 'Input field placeholder',
        },
      },
      {
        name: 'required',
        type: 'select',
        options: ['yes', 'no'],
        defaultValue: 'no',
        required: true,
        admin: {
          description: 'Is this field required?',
        },
      },
      {
        name: 'type',
        type: 'select',
        options: ['text', 'email', 'textarea', 'tel', 'number', 'select', 'radio'],
        required: true,
        admin: {
          description: 'Input field type',
        },
      },
      {
        name: 'options',
        type: 'array',
        fields: [
          {
            name: 'label',
            type: 'text',
            required: true,
            admin: {
              description: 'Option label',
            },
          },
          {
            name: 'value',
            type: 'text',
            required: true,
            admin: {
              description: 'Option value',
            },
          },
        ],
        admin: {
          description: 'Options for select/radio fields',
          condition: (_, siblingData) => ['select', 'radio'].includes(siblingData?.type),
        },
      },
    ],
  },
}

/**
 * Button configuration
 */
const buttonFields: Record<string, Field> = {
  submitButton: {
    name: 'submitButton',
    type: 'group',
    fields: [
      {
        name: 'label',
        type: 'text',
        required: true,
        defaultValue: 'Send Message',
        admin: {
          description: 'Submit button text',
        },
      },
    ],
  },
}

/**
 * List fields for list-based layouts
 */
const listFields = {
  icon: {
    name: 'icon',
    type: 'text',
    required: true,
    defaultValue: 'Check',
    admin: {
      description: 'Lucide icon name (e.g., Check)',
    },
  },
  text: {
    name: 'text',
    type: 'textarea',
    required: true,
    admin: {
      description: 'List item text',
    },
  },
} as const

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
  subtitle: {
    name: 'subtitle',
    type: 'text',
    required: true,
    admin: {
      description: 'Feature subtitle',
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
 * Combine all contact fields for the field group
 */
const contactFields: Record<string, Field> = {
  ...basicFields,
  ...formFields,
  ...buttonFields,
  ...listFields,
  ...mediaFields,
  ...cardsFields,
}

/**
 * Export all field groups for type safety
 */
export { basicFields, buttonFields, cardsFields, formFields, listFields, mediaFields }

/**
 * Create a custom contact field with selected fields and arrays
 * @param options - Field group configuration options
 * @returns - Contact field configuration
 */
export function createContactField(
  options: Omit<FieldGroupOptions<typeof contactFields>, 'name' | 'fields'>,
): GroupField {
  return createFieldGroup({
    name: 'contact',
    fields: contactFields,
    ...options,
    admin: {
      description: 'Contact form fields',
      ...options.admin,
    },
  })
}
