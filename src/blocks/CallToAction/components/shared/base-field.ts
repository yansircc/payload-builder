import type { Field } from 'payload'
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
export const buttonFields = {
  label: {
    type: 'text',
    name: 'label',
    label: 'Button Text',
    required: true,
  },
  link: {
    type: 'group',
    name: 'link',
    label: 'Link',
    fields: [
      {
        type: 'select',
        name: 'type',
        label: 'Type',
        defaultValue: 'reference',
        options: [
          { label: 'Internal Link', value: 'reference' },
          { label: 'Custom URL', value: 'custom' },
        ],
      },
      {
        type: 'checkbox',
        name: 'newTab',
        label: 'Open in new tab',
      },
      {
        type: 'relationship',
        name: 'reference',
        relationTo: ['pages', 'posts'],
        required: true,
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'reference',
        },
      },
      {
        type: 'text',
        name: 'url',
        label: 'URL',
        required: true,
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'custom',
        },
      },
      {
        type: 'select',
        name: 'appearance',
        label: 'Appearance',
        admin: {
          description: 'Choose how the link should be rendered.',
        },
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Outline', value: 'outline' },
          { label: 'Ghost', value: 'ghost' },
        ],
      },
    ],
  },
  variant: {
    type: 'select',
    name: 'variant',
    label: 'Style',
    required: true,
    defaultValue: 'default',
    options: [
      { label: 'Primary', value: 'default' },
      { label: 'Secondary', value: 'secondary' },
      { label: 'Outline', value: 'outline' },
      { label: 'Ghost', value: 'ghost' },
      { label: 'Link', value: 'link' },
      { label: 'Destructive', value: 'destructive' },
    ],
  },
} as Record<string, Field>

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
export function createCTAField({ includeFields, arrays = [] }: { includeFields: ('title' | 'description')[]; arrays?: { name: string; fields: Field[]; minRows?: number; maxRows?: number; admin?: { description?: string } }[] }): Field {
  const fields: Field[] = [
    includeFields.includes('title')
      ? {
          type: 'text',
          name: 'title',
          label: 'Title',
          required: true,
        }
      : null,
    includeFields.includes('description')
      ? {
          type: 'text',
          name: 'description',
          label: 'Description',
        }
      : null,
    ...arrays.map(
      (array): Field => ({
        type: 'array',
        name: array.name,
        label: array.name === 'buttons' ? 'Buttons' : false,
        admin: {
          ...array.admin,
          description: array.name === 'buttons' ? 'Add or remove buttons' : array.admin?.description,
        },
        labels: {
          singular: 'Button',
          plural: 'Buttons',
        },
        minRows: array.minRows,
        maxRows: array.maxRows,
        fields: array.fields,
      }),
    ),
  ].filter(Boolean) as Field[]

  return {
    name: 'cta',
    type: 'group',
    label: false,
    fields,
  }
}