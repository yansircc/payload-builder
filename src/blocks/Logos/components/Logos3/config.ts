import { GroupField } from 'payload'
import { createLogosField, logosSchemas } from '../shared/base-field'

/**
 * Logos3 field validation and type definitions
 */
export const schemas = {
  title: logosSchemas.title,
  logos: logosSchemas.logos,
}

/**
 * Complete configuration for Logos3
 */
export const logos3Fields: GroupField = {
  name: 'logos-3',
  interfaceName: 'Logos3Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Auto-scrolling logos carousel with gradient edges',
  },
  fields: [
    createLogosField({
      includeFields: ['title'],
      arrays: [
        {
          name: 'logos',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Logo image',
              },
            },
          ],
          minRows: 1,
          maxRows: 12,
          admin: {
            description: 'Logo images (1-12)',
          },
        },
      ],
    }),
  ],
}
