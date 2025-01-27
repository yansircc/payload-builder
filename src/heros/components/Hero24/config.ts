import { GroupField } from 'payload'
import { z } from 'zod'
import { createHeroField, featureFields, heroSchemas } from '../shared/base-field'

/**
 * Hero 24 field validation and type definitions
 */
export const schemas = {
  title: heroSchemas.title,
  subtitle: heroSchemas.subtitle,
  link: heroSchemas.link,
  logo: heroSchemas.logo,
  badge: heroSchemas.badge,
  features: z.array(heroSchemas.feature).length(4),
}

/**
 * Complete configuration for Hero 24
 */
export const hero24Fields: GroupField = {
  name: 'hero-24',
  interfaceName: 'Hero24Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero with logo, badge and feature list',
  },
  fields: [
    createHeroField({
      includeFields: ['logo', 'badge', 'title', 'subtitle', 'link'],
      arrays: [
        {
          name: 'features',
          fields: [featureFields.icon, featureFields.title, featureFields.description],
          minRows: 4,
          maxRows: 4,
          admin: {
            description: 'Feature list (exactly 4 items)',
          },
        },
      ],
    }),
  ],
}
