import { createFieldGroup, FieldGroupOptions } from '@/utilities/createFieldGroup'
import { Field, GroupField } from 'payload'
import { z } from 'zod'

/**
 * Atomic header field schemas
 */
export const headerSchemas = {
  /** Title schema */
  title: z.string().describe('The header title'),
  /** Image schema */
  logo: z.object({}).describe('The header image'),
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
}

/**
 * Basic fields configuration
 */
const basicFields: Record<string, Field> = {
  logo: {
    name: 'logo',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'Header logo',
    },
  },
  title: {
    name: 'title',
    type: 'text',
    required: true,
    admin: {
      description: 'Header title',
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
      description: 'Header logo',
    },
  },
} as const

/**
 * Combine all header fields for the field group
 */
const headerFields: Record<string, Field> = {
  ...basicFields,
  ...mediaFields,
}

/**
 * Export all field groups for type safety
 */
export { basicFields, mediaFields }

/**
 * Create a custom header field with selected fields and arrays
 * @param options - Field group configuration options
 * @returns - Header field configuration
 */
export function createHeaderField(
  options: Omit<FieldGroupOptions<typeof headerFields>, 'name' | 'fields'>,
): GroupField {
  return createFieldGroup({
    name: 'header',
    fields: headerFields,
    ...options,
    admin: {
      description: 'Header fields',
      ...options.admin,
    },
  })
}
