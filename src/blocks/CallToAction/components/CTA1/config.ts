import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'

import { createCTAField, ctaSchemas } from '../shared/base-field'

/**
 * CTA 1: Simple side-by-side layout with icon badge
 * Features:
 * - Icon badge with title
 * - Side-by-side content and image layout
 * - Optional subtitle text
 * - Single CTA button with arrow
 */
export const schemas = {
  title: ctaSchemas.title,
  subtitle: ctaSchemas.subtitle,
  links: z.array(ctaSchemas.link).min(1).max(1),
  image: ctaSchemas.image,
  icon: ctaSchemas.icon,
}

/**
 * Complete configuration for CTA 1
 */
export const cta1Fields: GroupField = {
  name: 'cta-1',
  interfaceName: 'CTA1Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Side-by-side layout with icon badge and single action button',
  },
  fields: [
    createCTAField({
      includeFields: ['title', 'subtitle', 'image', 'icon'],
      arrays: [
        {
          name: 'links',
          fields: [
            link({
              name: 'link-1',
              overrides: {
                admin: {
                  description: 'CTA button with ArrowRight suffix icon',
                },
                defaultValue: {
                  suffixIcon: 'ArrowRight',
                },
              },
            }),
          ],
          admin: {
            description: 'CTA button',
          },
          minRows: 1,
          maxRows: 1,
        },
      ],
    }),
  ],
}
