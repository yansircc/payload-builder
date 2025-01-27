import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'
import { createHeroField, heroSchemas, mediaFields } from '../shared/base-field'

/**
 * Hero 6 field validation and type definitions
 */
export const schemas = {
  title: heroSchemas.title,
  subtitle: heroSchemas.subtitle,
  links: z.array(heroSchemas.link).min(3).max(3),
  image: heroSchemas.image,
  secondaryImage: heroSchemas.image,
  partners: z.array(heroSchemas.partner).min(4).max(4),
}

/**
 * Complete configuration for Hero 6
 */
export const hero6Fields: GroupField = {
  name: 'hero-6',
  interfaceName: 'Hero6Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero with two images and partner logos',
  },
  fields: [
    createHeroField({
      includeFields: ['title', 'subtitle', 'image'],
      arrays: [
        {
          name: 'links',
          fields: [
            link({
              overrides: {
                defaultValue: { suffixIcon: 'ChevronRight' },
              },
            }),
          ],
          minRows: 3,
          maxRows: 3,
          admin: {
            description: 'Hero buttons (exactly 3)',
          },
        },
        {
          name: 'partners',
          fields: [mediaFields.logo],
          minRows: 4,
          maxRows: 4,
          admin: {
            description: 'Partner logos (exactly 4)',
          },
        },
      ],
      groups: [
        {
          name: 'secondaryImage',
          fields: ['image'],
          admin: {
            description: 'Secondary image with button',
          },
        },
      ],
    }),
  ],
}
