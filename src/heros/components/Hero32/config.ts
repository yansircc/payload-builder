import { GroupField } from 'payload'
import { createFieldLabel } from '@/i18n'
import { createHeroField, heroSchemas } from '../shared/base-field'

/**
 * Hero 32 field validation and type definitions
 */
export const schemas = {
  title: heroSchemas.title,
  subtitle: heroSchemas.subtitle,
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
    description: 'Hero section with title, button, and grid of integration images',
  },
  fields: [
    createHeroField({
      includeFields: ['title', 'subtitle', 'link'],
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
            description: createFieldLabel('hero32.hero.integrations', 'pages'),
          },
        },
      ],
    }),
  ],
}
