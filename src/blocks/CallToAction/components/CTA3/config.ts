import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'
import { createCTAField, ctaSchemas, mediaFields } from '../shared/base-field'

/**
 * CTA 3 field validation and type definitions
 */
export const schemas = {
  title: ctaSchemas.title,
  subtitle: ctaSchemas.subtitle,
  reviewCount: z.string().describe('Text showing review count'),
  rating: z.number().min(0).max(5).describe('Rating value out of 5'),
  primaryButton: ctaSchemas.link,
  secondaryButton: ctaSchemas.link,
  image: ctaSchemas.image,
}

/**
 * Complete configuration for CTA 3
 */
export const cta3Fields: GroupField = {
  name: 'cta-3',
  interfaceName: 'CTA3Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'CTA section with rating, avatars, and dual CTA buttons',
  },
  fields: [
    createCTAField({
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
            description: 'CTA media',
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
                  description: 'CTA button with ArrowDownRight suffix icon',
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
            description: 'CTA buttons (exactly 2)',
          },
        },
      ],
    }),
  ],
}
