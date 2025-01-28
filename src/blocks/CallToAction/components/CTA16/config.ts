import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'
import { createCTAField, ctaSchemas } from '../shared/base-field'

/**
 * CTA 16 field validation and type definitions
 */
export const schemas = {
  title: ctaSchemas.title,
  subtitle: ctaSchemas.subtitle,
  icon: ctaSchemas.icon,
  backgroundImage: ctaSchemas.image,
  links: z.array(ctaSchemas.link).min(1).max(2),
}

/**
 * Complete configuration for CTA 16
 */
export const cta16Fields: GroupField = {
  name: 'cta-16',
  interfaceName: 'CTA16Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'CTA with button and list of links',
  },
  fields: [
    createCTAField({
      includeFields: ['title', 'subtitle', 'icon', 'image'],
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
