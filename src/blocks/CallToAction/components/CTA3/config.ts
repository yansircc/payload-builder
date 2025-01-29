import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'
import { createCTAField, ctaSchemas } from '../shared/base-field'

/**
 * CTA 3: Feature list with dual action layout
 * Features:
 * - Primary CTA button with arrow
 * - Multiple feature links with chevron
 * - Optional descriptions for each feature
 * - Clean list-based layout
 */
export const schemas = {
  title: ctaSchemas.title,
  subtitle: ctaSchemas.subtitle,
  buttonLinks: z.array(ctaSchemas.link).min(1).max(2),
  listLinks: z.array(ctaSchemas.link).min(1).max(3),
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
    description: 'Feature list layout with primary action and multiple feature links',
  },
  fields: [
    createCTAField({
      includeFields: ['title', 'subtitle'],
      arrays: [
        {
          name: 'buttonLinks',
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
          name: 'listLinks',
          fields: [
            link({
              name: 'link',
              overrides: {
                admin: {
                  description: 'List item link',
                },
                defaultValue: {
                  suffixIcon: 'ChevronRight',
                },
              },
            }),
            {
              name: 'description',
              type: 'textarea',
              admin: {
                description: 'Description text for the link',
              },
            },
          ],
          admin: {
            description: 'List of links',
          },
          minRows: 1,
          maxRows: 5,
        },
      ],
    }),
  ],
}
