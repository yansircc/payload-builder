import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'

import { createCTAField, ctaSchemas } from '../shared/base-field'

/**
 * CTA 10: Full-width banner with background image
 * Features:
 * - Full-width background image
 * - Overlay text content
 * - Dual action buttons
 * - High-impact design
 */
export const schemas = {
  title: ctaSchemas.title,
  subtitle: ctaSchemas.subtitle,
  links: z.array(ctaSchemas.link).min(1).max(2),
}

/**
 * Complete configuration for CTA 10
 */
export const cta10Fields: GroupField = {
  name: 'cta-10',
  interfaceName: 'CTA10Fields',
  label: false,
  type: 'group',
  admin: {
    description:
      'Full-width banner with background image and dual action buttons',
  },
  fields: [
    createCTAField({
      includeFields: ['title', 'subtitle'],
      arrays: [
        {
          name: 'links',
          fields: [
            link({
              name: 'link-1',
              overrides: {
                admin: {
                  description: 'CTA buttons',
                },
              },
            }),
          ],
          admin: {
            description: 'CTA buttons',
          },
          minRows: 1,
          maxRows: 2,
        },
      ],
    }),
  ],
}
