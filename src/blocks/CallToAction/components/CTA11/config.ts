import { GroupField } from 'payload'
import { z } from 'zod'
import { link } from '@/fields/link'
import { createCTAField, ctaSchemas } from '../shared/base-field'

/**
 * CTA 11 field validation and type definitions
 */
export const schemas = {
  title: ctaSchemas.title,
  subtitle: ctaSchemas.subtitle,
  links: z.array(ctaSchemas.link).min(1).max(2),
}

/**
 * Complete configuration for CTA 11
 */
export const cta11Fields: GroupField = {
  name: 'cta-11',
  interfaceName: 'CTA11Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'CTA with button and list of links',
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
