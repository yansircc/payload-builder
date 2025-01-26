import { GroupField } from 'payload'
import { z } from 'zod'
import { createHeroField, heroSchemas } from '../shared/base-field'

/**
 * Hero45 field validation and type definitions
 */
export const schemas = {
  badge: heroSchemas.badge,
  title: heroSchemas.title,
  image: heroSchemas.image,
  features: z
    .array(
      z.object({
        icon: z.enum(['HandHelping', 'Users', 'Zap']).describe('Feature icon'),
        title: z.string().describe('Feature title'),
        description: z.string().describe('Feature description'),
      }),
    )
    .length(3)
    .describe('Features section with exactly 3 items'),
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
          fields: [
            {
              name: 'icon',
              type: 'select',
              required: true,
              options: ['HandHelping', 'Users', 'Zap'],
              admin: {
                description: 'Feature icon',
              },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Feature title',
              },
            },
            {
              name: 'description',
              type: 'text',
              required: true,
              admin: {
                description: 'Feature description',
              },
            },
          ],
          minRows: 3,
          maxRows: 3,
          admin: {
            description: 'Features section (exactly 3 items)',
          },
        },
      ],
    }),
  ],
}
