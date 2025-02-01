import { GroupField } from 'payload'
import { z } from 'zod'
import { basicFields, createLogosField, logosSchemas } from '../shared/base-field'

/**
 * Logos 2 field validation and type definitions
 */
export const schemas = {
  title: logosSchemas.title,
  description: logosSchemas.description,
  logos: logosSchemas.logos,
  button: {
    label: z.string().describe('Button label'),
    url: z.string().describe('Button URL'),
  },
}

/**
 * Complete configuration for Logos 2
 */
export const logos2Fields: GroupField = {
  name: 'logos-2',
  interfaceName: 'Logos2Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Logos component with a grid layout and a call-to-action button',
  },
  fields: [
    createLogosField({
      includeFields: ['title', 'description'],
      arrays: [
        {
          name: 'logos',
          fields: [basicFields.uploadField],
          minRows: 6,
          maxRows: 6,
          admin: {
            description: 'Logo images (6 required)',
          },
        },
      ],
      groups: [
        {
          name: 'button',
          fields: ['label', 'url'],
          admin: {
            description: 'Call-to-action button',
          },
        },
      ],
    }),
  ],
}
