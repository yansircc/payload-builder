import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'
import { createCTAField, ctaSchemas } from '../shared/base-field'

/**
 * CTA 1 field validation and type definitions
 */
export const schemas = {
  title: ctaSchemas.title,
  subtitle: ctaSchemas.subtitle,
  links: z.array(ctaSchemas.link).min(1).max(1),
  image: ctaSchemas.image,
  icon: z.string().optional().describe('Lucide icon name'),
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
    description: 'Simple CTA card with image and single button',
  },
  fields: [
    createCTAField({
      includeFields: ['icon', 'title', 'subtitle', 'image'],
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
