import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'

import { createCTAField, ctaSchemas, listFields } from '../shared/base-field'

/**
 * CTA 4: Accent card with feature list
 * Features:
 * - Accent background color
 * - Icon-based feature list
 * - Single action button with arrow
 * - Compact card layout
 */
export const schemas = {
  title: ctaSchemas.title,
  subtitle: ctaSchemas.subtitle,
  links: z.array(ctaSchemas.link).min(1).max(2),
  lists: z.array(ctaSchemas.list).min(1).max(3),
}

/**
 * Complete configuration for CTA 4
 */
export const cta4Fields: GroupField = {
  name: 'cta-4',
  interfaceName: 'CTA4Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Accent card with feature list and single action button',
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
                defaultValue: {
                  suffixIcon: 'ArrowRight',
                },
              },
            }),
          ],
          admin: {
            description: 'CTA buttons',
          },
          minRows: 1,
          maxRows: 1,
        },
        {
          name: 'lists',
          fields: Object.values(listFields),
          admin: {
            description: 'List with icons',
          },
          minRows: 1,
          maxRows: 6,
        },
      ],
    }),
  ],
}
