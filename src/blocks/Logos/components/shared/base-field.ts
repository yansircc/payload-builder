import { link } from '@/fields/link'
import { createFieldGroup, FieldGroupOptions } from '@/utilities/createFieldGroup'
import { Field, GroupField } from 'payload'
import { z } from 'zod'

/**
 * Zod schemas for logos fields validation
 */
export const logosSchemas = {
  /** Title schema */
  title: z.string().describe('The main title text'),
  /** Description schema */
  description: z.string().describe('The description text'),
  /** Logos array schema */
  logos: z.array(z.any()).describe('Array of logo images'),
  /** Link schema */
  link: z.string().describe('Main button link'),
}

/**
 * Basic field configurations for logos
 */
export const basicFields = {
  title: {
    name: 'title',
    type: 'text',
    required: true,
    admin: {
      description: 'Main title text',
    },
  } as Field,
  description: {
    name: 'description',
    type: 'textarea',
    admin: {
      description: 'Description text',
    },
  } as Field,
  uploadField: {
    name: 'logo',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'Logo image',
    },
  } as Field,
  link: link({
    overrides: {
      admin: {
        description: 'Button link',
      },
    },
  }),
}

/**
 * Combine all logos fields for the field group
 */
const logosFields: Record<string, Field> = {
  ...basicFields,
}

/**
 * Helper function to create logos field configuration
 */
export function createLogosField(
  options: Omit<FieldGroupOptions<typeof logosFields>, 'name' | 'fields'>,
): GroupField {
  return createFieldGroup({
    name: 'logos',
    fields: logosFields,
    ...options,
    admin: {
      description: 'Logos fields',
      ...options.admin,
    },
  })
}
