import { GroupField } from 'payload'
import { createLogosField, logosSchemas } from '../shared/base-field'

/**
 * Logos8 field validation and type definitions
 */
export const schemas = {
  title: logosSchemas.title,
  subtitle: logosSchemas.description,
  logos: logosSchemas.logos,
}

/**
 * Complete configuration for Logos8
 */
export const logos8Fields: GroupField = {
  name: 'logos-8',
  interfaceName: 'Logos8Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Logos grid with title, subtitle, and custom logo sizes',
  },
  fields: [
    createLogosField({
      includeFields: ['title', 'description'],
      arrays: [
        {
          name: 'logos',
          fields: [
            {
              name: 'logo',
              type: 'group',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Logo name',
                  },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  admin: {
                    description: 'Logo image',
                  },
                },
                {
                  name: 'className',
                  type: 'text',
                  admin: {
                    description: 'Optional CSS classes for the logo',
                  },
                },
              ],
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
