import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'
import { createHeroField, heroSchemas } from '../shared/base-field'

/**
 * Hero 1 field validation and type definitions
 */
export const schemas = {
  title: heroSchemas.title,
  subtitle: heroSchemas.subtitle,
  links: z.array(heroSchemas.link).min(2).max(2),
  image: heroSchemas.image,
  badge: heroSchemas.badge,
}

/**
 * Complete configuration for Hero 1
 */
export const hero1Fields: GroupField = {
  name: 'hero-1',
  interfaceName: 'Hero1Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero with a badge on the top left',
  },
  fields: [
    createHeroField({
      includeFields: ['title', 'subtitle', 'image', 'badge'],
      arrays: [
        {
          name: 'links',
          fields: [
            link({
              name: 'link-1',
            }),
            link({
              name: 'link-2',
              overrides: {
                admin: {
                  description: 'Hero button with ArrowDownRight suffix icon',
                },
                defaultValue: {
                  suffixIcon: 'ArrowDownRight',
                },
              },
            }),
          ],
          minRows: 1,
          maxRows: 1,
        },
      ],
    }),
  ],
}
