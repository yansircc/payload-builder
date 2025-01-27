import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'
import { createHeroField, heroSchemas } from '../shared/base-field'

/**
 * Hero 8 field validation and type definitions
 */
export const schemas = {
  title: heroSchemas.title,
  subtitle: heroSchemas.subtitle,
  links: z.array(heroSchemas.link).min(2).max(2),
  image: heroSchemas.image,
}

/**
 * Complete configuration for Hero 8
 */
export const hero8Fields: GroupField = {
  name: 'hero-8',
  interfaceName: 'Hero8Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero with centered layout and large bottom image',
  },
  fields: [
    createHeroField({
      includeFields: ['title', 'subtitle', 'image'],
      arrays: [
        {
          name: 'links',
          fields: [link({ overrides: { defaultValue: { suffixIcon: 'ChevronRight' } } })],
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
