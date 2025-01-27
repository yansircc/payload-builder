import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'
import { createHeroField, featureFields, heroSchemas } from '../shared/base-field'

/**
 * Hero 25 field validation and type definitions
 */
export const schemas = {
  title: heroSchemas.title,
  subtitle: heroSchemas.subtitle,
  link: heroSchemas.link,
  logo: heroSchemas.logo,
  badge: heroSchemas.badge,
  features: z.array(heroSchemas.feature).min(1).max(4),
}

/**
 * Complete configuration for Hero 25
 */
export const hero25Fields: GroupField = {
  name: 'hero-25',
  interfaceName: 'Hero25Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Centered hero with logo, badge and feature list',
  },
  fields: [
    createHeroField({
      includeFields: ['title', 'subtitle', 'logo', 'badge'],
      arrays: [
        {
          name: 'links',
          fields: [
            link({
              overrides: {
                admin: {
                  description: 'Hero button',
                },
                defaultValue: {
                  suffixIcon: 'MoveRight',
                },
              },
            }),
          ],
          minRows: 1,
          maxRows: 2,
          admin: {
            description: 'Hero buttons (1-2)',
          },
        },
        {
          name: 'features',
          fields: [featureFields.icon, featureFields.title, featureFields.description],
          minRows: 1,
          maxRows: 4,
          admin: {
            description: 'Feature list (1-4 items)',
          },
        },
      ],
    }),
  ],
}
