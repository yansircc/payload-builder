import { GroupField } from 'payload'
import { z } from 'zod'
import { link } from '@/fields/link'
import { createCTAField, ctaSchemas } from '../shared/base-field'

/**
 * CTA 5: Image-focused side content layout
 * Features:
 * - Large image placement
 * - Side-by-side content structure
 * - Single action button
 * - Clean, minimal design
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
 * - Title and subtitle for main content
 * - Featured image placement
 * - Single action button
 */
export const cta5Fields: GroupField = {
  name: 'cta-5',
  interfaceName: 'CTA5Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Image-focused layout with side content and action button',
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
