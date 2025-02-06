import { GroupField } from 'payload'

import { createHeroField, heroSchemas } from '../shared/base-field'

/**
 * Hero 32 field validation and type definitions
 */
export const schemas = {
  title: heroSchemas.title,
  link: heroSchemas.link,
  image: heroSchemas.image,
}

/**
 * Complete configuration for Hero 32
 */
export const hero32Fields: GroupField = {
  name: 'hero-32',
  interfaceName: 'Hero32Fields',
  label: false,
  type: 'group',
  admin: {
    description:
      'Hero section with title, button, and grid of integration images',
  },
  fields: [
    createHeroField({
      includeFields: ['title', 'link'],
      arrays: [
        {
          name: 'integrations',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Integration logo/image',
              },
            },
          ],
          minRows: 15,
          maxRows: 15,
          admin: {
            description: 'Integration images (exactly 15)',
          },
        },
      ],
    }),
  ],
}
