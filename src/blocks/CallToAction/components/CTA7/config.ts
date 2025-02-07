import { GroupField } from 'payload'
import { z } from 'zod'
import { link } from '@/fields/link'
import { createCTAField, ctaSchemas, listFields } from '../shared/base-field'

/**
 * CTA 7: Feature list with icon highlights
 * Features:
 * - Icon-based feature list
 * - Single action button
 * - Multiple feature points
 * - Clean, organized layout
 */
export const schemas = {
  title: ctaSchemas.title,
  subtitle: ctaSchemas.subtitle,
  links: z.array(ctaSchemas.link).min(1).max(2),
  lists: z.array(ctaSchemas.list).min(1).max(3),
}

/**
 * Complete configuration for CTA 7
 */
export const cta7Fields: GroupField = {
  name: 'cta-7',
  interfaceName: 'CTA7Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Feature list with icon highlights and single action button',
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
          maxRows: 1,
        },
        {
          name: 'lists',
          fields: [...Object.values(listFields)],
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
