import { Field } from 'payload'
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
}

interface CreateLogosFieldOptions {
  includeFields: Array<keyof typeof basicFields>
  arrays?: Array<{
    name: string
    fields: Field[]
    minRows?: number
    maxRows?: number
    admin?: {
      description?: string
    }
  }>
  groups?: Array<{
    name: string
    fields: string[]
    admin?: {
      description?: string
    }
  }>
}

/**
 * Helper function to create logos field configuration
 */
export function createLogosField(options: CreateLogosFieldOptions): Field {
  const fields: Field[] = options.includeFields.map((fieldName) => basicFields[fieldName])

  if (options.arrays) {
    options.arrays.forEach((array) => {
      fields.push({
        name: array.name,
        type: 'array',
        fields: [basicFields.uploadField],
        minRows: array.minRows,
        maxRows: array.maxRows,
        admin: array.admin,
      })
    })
  }

  if (options.groups) {
    options.groups.forEach((group) => {
      fields.push({
        name: group.name,
        type: 'group',
        fields: group.fields.map((fieldName) => ({
          name: fieldName,
          type: 'text',
          required: true,
        })),
        admin: group.admin,
      })
    })
  }

  return {
    type: 'group',
    name: 'logos',
    fields,
  }
}
