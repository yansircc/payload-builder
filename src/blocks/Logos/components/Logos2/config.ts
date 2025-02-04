import { GroupField } from 'payload'
import { basicFields, createLogosField, logosSchemas } from '../shared/base-field'

/**
 * Logos 2 field validation and type definitions
 */
export const schemas = {
  title: logosSchemas.title,
  description: logosSchemas.description,
  logos: logosSchemas.logos,
  link: logosSchemas.link,
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
      includeFields: ['title', 'description', 'link'],
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
    }),
  ],
}
