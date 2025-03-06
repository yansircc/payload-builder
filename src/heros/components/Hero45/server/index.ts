import { GroupField } from 'payload'
import { z } from 'zod'
import { createHeroField, featureFields, heroSchemas } from '../../shared/base-field'

/**
 * Hero45 field validation and type definitions
 */
export const schemas = {
  badge: heroSchemas.badge,
  title: heroSchemas.title,
  image: heroSchemas.image,
  features: z.array(heroSchemas.feature).length(3),
}

/**
 * Complete configuration for Hero45
 */
export const hero45Fields: GroupField = {
  name: 'hero-45',
  interfaceName: 'Hero45Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero section with badge, title, image, and three features',
  },
  fields: [
    createHeroField({
      includeFields: ['badge', 'title', 'image'],
      arrays: [
        {
          name: 'features',
          fields: [featureFields.icon, featureFields.title, featureFields.description],
          minRows: 3,
          maxRows: 3,
          admin: {
            description: 'Feature list (exactly 3 items)',
          },
        },
      ],
    }),
  ],
}
