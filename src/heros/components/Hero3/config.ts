import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'
import { createHeroField, heroSchemas, mediaFields } from '../shared/base-field'

/**
 * Hero 3 field validation and type definitions
 */
export const schemas = {
  title: heroSchemas.title,
  subtitle: heroSchemas.subtitle,
  reviewCount: z.string().describe('Text showing review count'),
  rating: z.number().min(0).max(5).describe('Rating value out of 5'),
  primaryButton: heroSchemas.link,
  secondaryButton: heroSchemas.link,
  image: heroSchemas.image,
}

/**
 * Complete configuration for Hero 3
 */
export const hero3Fields: GroupField = {
  name: 'hero-3',
  interfaceName: 'Hero3Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero section with rating, avatars, and dual CTA buttons',
  },
  fields: [
    createHeroField({
      includeFields: ['title', 'subtitle'],
      groups: [
        {
          name: 'review',
          fields: ['rate', 'count'],
          admin: {
            description: 'Review section configuration',
          },
        },
        {
          name: 'media',
          fields: ['image'],
          admin: {
            description: 'Hero media',
          },
        },
      ],
      arrays: [
        {
          name: 'avatars',
          fields: [mediaFields.image],
          minRows: 5,
          maxRows: 5,
          admin: {
            description: 'Avatar images (exactly 5)',
          },
        },
        {
          name: 'links',
          fields: [
            link({ name: 'link-1' }),
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
          admin: {
            description: 'Hero buttons (exactly 2)',
          },
        },
      ],
    }),
  ],
}
