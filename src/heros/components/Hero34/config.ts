import { GroupField } from 'payload'
import { z } from 'zod'
import { basicFields, createHeroField, heroSchemas } from '../shared/base-field'

/**
 * Hero 34 field validation and type definitions
 */
export const schemas = {
  title: heroSchemas.title,
  subtitle: heroSchemas.subtitle,
  links: z.array(heroSchemas.link).min(2).max(2),
  image: heroSchemas.image,
  badge: heroSchemas.badge,
}

/**
 * Complete configuration for Hero 34
 */
export const hero34Fields: GroupField = {
  name: 'hero-34',
  interfaceName: 'Hero34Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero with left content and right image layout',
  },
  fields: [
    createHeroField({
      includeFields: ['title', 'subtitle', 'image', 'badge'],
      arrays: [
        {
          name: 'links',
          fields: [basicFields.link],
          minRows: 2,
          maxRows: 2,
          admin: {
            description: 'Hero buttons (exactly 2)',
          },
        },
      ],
    }),
  ],
}
