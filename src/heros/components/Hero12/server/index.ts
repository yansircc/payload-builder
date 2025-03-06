import { GroupField } from 'payload'
import { z } from 'zod'
import { link } from '@/fields/link'
import { createHeroField, heroSchemas, partnerFields } from '../../shared/base-field'

/**
 * Hero 12 field validation and type definitions
 */
export const schemas = {
  title: heroSchemas.title,
  subtitle: heroSchemas.subtitle,
  links: z.array(heroSchemas.link).min(1).max(2),
  logo: heroSchemas.logo,
  badge: heroSchemas.badge,
  partners: z
    .array(z.object({ logo: heroSchemas.logo }))
    .min(1)
    .max(6),
}

/**
 * Complete configuration for Hero 12
 */
export const hero12Fields: GroupField = {
  name: 'hero-12',
  interfaceName: 'Hero12Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero with logo, badge and partner logos',
  },
  fields: [
    createHeroField({
      includeFields: ['title', 'subtitle', 'logo', 'badge'],
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
                  description: 'Hero button with ExternalLink suffix icon',
                },
                defaultValue: {
                  suffixIcon: 'ExternalLink',
                },
              },
            }),
          ],
          minRows: 1,
          maxRows: 1,
          admin: {
            description: 'Hero buttons (1-2)',
          },
        },
        {
          name: 'partners',
          fields: [partnerFields.logo],
          minRows: 1,
          maxRows: 6,
          admin: {
            description: 'Partner logos (1-6)',
          },
        },
      ],
    }),
  ],
}
