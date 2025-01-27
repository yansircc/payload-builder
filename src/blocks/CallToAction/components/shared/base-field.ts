import { link } from '@/fields/link'
import { createFieldGroup, FieldGroupOptions } from '@/utilities/createFieldGroup'
import { Field, GroupField } from 'payload'
import { z } from 'zod'

/**
 * CTA field schemas
 */
export const ctaSchemas = {
  /** Title schema */
  title: z.string().describe('The CTA title'),
  /** Description schema */
  description: z.string().describe('The CTA description'),
  /** Button schema */
  button: z.object({
    label: z.string().describe('Button label'),
    link: z.string().describe('Button link'),
    variant: z.enum(['default', 'outline', 'ghost', 'link', 'destructive', 'secondary']).describe('Button variant'),
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
      description: 'CTA title',
    },
  },
  description: {
    name: 'description',
    type: 'textarea',
    admin: {
      description: 'CTA description',
    },
  },
} as const

/**
 * Button fields configuration
 */
export const buttonFields: Record<string, Field> = {
  label: {
    name: 'label',
    type: 'text',
    required: true,
    admin: {
      description: 'Button label',
    },
  },
  link: link({
    overrides: {
      admin: {
        description: 'Button link',
      },
    },
  }),
  variant: {
    name: 'variant',
    type: 'select',
    defaultValue: 'default',
    options: [
      { label: 'Default', value: 'default' },
      { label: 'Outline', value: 'outline' },
      { label: 'Ghost', value: 'ghost' },
      { label: 'Link', value: 'link' },
      { label: 'Destructive', value: 'destructive' },
      { label: 'Secondary', value: 'secondary' },
    ],
    required: true,
  },
}

/**
 * Combine all CTA fields for the field group
 */
const ctaFields = {
  ...basicFields,
} as const

/**
 * Export all field groups for type safety
 */
export { basicFields }

/**
 * Create a custom CTA field with selected fields
 * @param options - Field group configuration options
 * @returns - CTA field configuration
 */
export function createCTAField(
  options: Omit<FieldGroupOptions<typeof ctaFields>, 'name' | 'fields'>,
): GroupField {
  return createFieldGroup({
    name: 'cta',
    fields: ctaFields,
    ...options,
    admin: {
      description: 'CTA section fields',
      ...options.admin,
    },
  })
}