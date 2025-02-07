import { GroupField } from 'payload'
import { z } from 'zod'
import { link } from '@/fields/link'
import { createCTAField, ctaSchemas } from '../shared/base-field'

/**
 * CTA 15: Modern split layout with radial gradient background
 * Features:
 * - Radial gradient background effect
 * - Split content layout (text and image)
 * - Optional heading above title
 * - Responsive design with image placement
 */
export const schemas = {
  title: ctaSchemas.title,
  subtitle: ctaSchemas.subtitle,
  heading: ctaSchemas.heading,
  links: z.array(ctaSchemas.link).min(1).max(1),
  image: ctaSchemas.image,
}

/**
 * Complete configuration for CTA 15
 */
export const cta15Fields: GroupField = {
  name: 'cta-15',
  interfaceName: 'CTA15Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Modern split layout with radial gradient and optional heading',
  },
  fields: [
    createCTAField({
      includeFields: ['heading', 'title', 'subtitle', 'image'],
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
          maxRows: 2,
        },
      ],
    }),
  ],
}
