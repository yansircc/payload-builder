import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'
import { createCTAField, ctaSchemas } from '../shared/base-field'

/**
 * CTA 5 field validation and type definitions
 */
export const schemas = {
  title: ctaSchemas.title,
  subtitle: ctaSchemas.subtitle,
  image: ctaSchemas.image,
  links: z.array(ctaSchemas.link).min(1).max(2),
}

/**
 * CTA 5 configuration
 *
 * This CTA includes:
 * - Title and subtitle
 * - A link
 * - Image on the left
 */
export const cta5Fields: GroupField = {
  name: 'cta-5',
  interfaceName: 'CTA5Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'CTA with image on the left',
  },
  fields: [
    createCTAField({
      includeFields: ['title', 'subtitle', 'image'],
      arrays: [
        {
          name: 'links',
          fields: [
            link({
              name: 'link-1',
              overrides: {
                admin: {
                  description: 'Primary link',
                },
              },
            }),
          ],
          admin: {
            description: 'CTA links',
          },
          minRows: 1,
          maxRows: 1,
        },
      ],
    }),
  ],
}
