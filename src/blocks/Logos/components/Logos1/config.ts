import { GroupField } from 'payload'
import { basicFields, createLogosField, logosSchemas } from '../shared/base-field'

/**
 * Logos 1 field validation and type definitions
 */
export const schemas = {
  title: logosSchemas.title,
  logos: logosSchemas.logos,
}

/**
 * Complete configuration for Logos 1
 */
export const logos1Fields: GroupField = {
  name: 'logos-1',
  interfaceName: 'Logos1Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'A simple logos component with grayscale effect and title',
  },
  fields: [
    createLogosField({
      includeFields: ['title'],
      arrays: [
        {
          name: 'logos',
          fields: [basicFields.uploadField],
          minRows: 1,
          maxRows: 5,
          admin: {
            description: 'Logo images (1-5)',
          },
        },
      ],
    }),
  ],
}
