import { link } from '@/fields/link'
import { GroupField } from 'payload'

import { createHeroField, heroSchemas } from '../shared/base-field'

/**
 * Hero 115 field validation and type definitions
 */
export const schemas = {
  title: heroSchemas.title,
  subtitle: heroSchemas.subtitle,
  link: heroSchemas.link,
  trustText: heroSchemas.trustText,
  image: heroSchemas.image,
}

/**
 * Complete configuration for Hero 115
 */
export const hero115Fields: GroupField = {
  name: 'hero-115',
  interfaceName: 'Hero115Fields',
  label: false,
  type: 'group',
  admin: {
    description:
      'Hero section with centered content, circular decorative borders, and a large image',
  },
  fields: [
    createHeroField({
      includeFields: ['title', 'subtitle', 'trustText', 'image'],
      arrays: [
        {
          name: 'links',
          fields: [
            link({
              name: 'link',
              overrides: {
                admin: {
                  description: 'Hero button with Zap suffix icon',
                },
                defaultValue: {
                  suffixIcon: 'Zap',
                },
              },
            }),
          ],
          admin: {
            description: 'Hero button',
          },
          minRows: 1,
          maxRows: 1,
        },
      ],
    }),
  ],
}
