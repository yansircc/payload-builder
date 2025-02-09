import { Field, GroupField } from 'payload'
import { z } from 'zod'
import { createFieldGroup, FieldGroupOptions } from '@/utilities/createFieldGroup'

/**
 * Atomic faq field schemas
 */
export const faqSchemas = {
  /** Title schema */
  title: z.string().describe('The faq title'),
  /** Subtitle schema */
  subtitle: z.string().describe('The faq subtitle'),
  /** Description schema */
  description: z.string().describe('The faq description'),
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
  /** List schema */
  list: z.array(
    z.object({
      icon: z.string().optional(),
      text: z.string(),
    }),
  ),
  faqs: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    )
    .optional()
    .describe('Options for select/radio fields'),
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
      description: 'FAQ title',
    },
  },
  subtitle: {
    name: 'subtitle',
    type: 'text',
    required: false,
    admin: {
      description: 'FAQ subtitle',
    },
  },
  description: {
    name: 'description',
    type: 'textarea',
    required: false,
    admin: {
      description: 'FAQ description',
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
 * FAQ fields
 */
const faqsFields = {
  question: {
    name: 'question',
    type: 'text',
    required: true,
    admin: {
      description: 'Question',
    },
  },
  answer: {
    name: 'answer',
    type: 'text',
    required: true,
    admin: {
      description: 'Answer',
    },
  },
} as const

/**
 * Combine all faq fields for the field group
 */
const faqFields: Record<string, Field> = {
  ...basicFields,
  ...listFields,
  ...mediaFields,
  ...faqsFields,
}

/**
 * Export all field groups for type safety
 */
export { basicFields, faqsFields, listFields, mediaFields }

interface FAQFieldOptions extends Omit<FieldGroupOptions<typeof faqFields>, 'name' | 'fields'> {
  fieldOverrides?: {
    [K in keyof typeof faqFields]?: Partial<(typeof faqFields)[K]>
  }
}

/**
 * Create a custom faq field with selected fields and arrays
 * @param options - Field group configuration options
 * @returns - FAQ field configuration
 */

export function createFAQField(options: FAQFieldOptions): GroupField {
  const { fieldOverrides = {}, ...restOptions } = options

  // Create a new fields object with overrides applied
  const fieldsWithOverrides = { ...faqFields }

  // Type-safe field override application
  Object.entries(fieldOverrides).forEach(([fieldName, overrides]) => {
    const key = fieldName as keyof typeof faqFields
    if (fieldsWithOverrides[key]) {
      fieldsWithOverrides[key] = {
        ...fieldsWithOverrides[key],
        ...overrides,
      } as (typeof faqFields)[typeof key]
    }
  })

  return createFieldGroup({
    name: 'faq',
    fields: fieldsWithOverrides,
    ...restOptions,
    admin: {
      description: 'FAQ section fields',
      ...options.admin,
    },
  })
}
