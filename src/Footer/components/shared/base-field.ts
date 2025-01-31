import { createFieldGroup, FieldGroupOptions } from '@/utilities/createFieldGroup'
import { Field, GroupField } from 'payload'
import { z } from 'zod'

/**
 * Atomic footer field schemas
 */
export const footerSchemas = {
  /** Title schema */
  title: z.string().describe('The footer title'),
  /** Subtitle schema */
  subtitle: z.string().describe('The footer subtitle'),
  /** Description schema */
  description: z.string().describe('The footer description'),
  /** Image schema */
  image: z.object({}).describe('The footer image'),
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
  /** Navigation schema */
  navigation: z.array(
    z.object({
      title: z.string().describe('Title for the navigation column'),
      links: z.array(
        z.object({
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
      ),
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
      description: 'Footer title',
    },
  },
  subtitle: {
    name: 'subtitle',
    type: 'text',
    required: false,
    admin: {
      description: 'Footer subtitle',
    },
  },
  description: {
    name: 'description',
    type: 'textarea',
    required: false,
    admin: {
      description: 'Footer description',
    },
  },
  logo: {
    name: 'logo',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'Footer logo',
    },
  },
}

/**
 * Media fields configuration
 */
const mediaFields = {
  logo: {
    name: 'logo',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'Footer logo',
    },
  },
} as const

/**
 * Combine all footer fields for the field group
 */
const footerFields: Record<string, Field> = {
  ...basicFields,
  ...mediaFields,
}

/**
 * Export all field groups for type safety
 */
export { basicFields, mediaFields }

/**
 * Create a custom footer field with selected fields and arrays
 * @param options - Field group configuration options
 * @returns - Footer field configuration
 */
export function createFooterField(
  options: Omit<FieldGroupOptions<typeof footerFields>, 'name' | 'fields'>,
): GroupField {
  return createFieldGroup({
    name: 'footer',
    fields: footerFields,
    ...options,
    admin: {
      description: 'Footer fields',
      ...options.admin,
    },
  })
}
