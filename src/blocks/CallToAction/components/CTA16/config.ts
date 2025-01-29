import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'
import { createCTAField, ctaSchemas } from '../shared/base-field'

/**
 * CTA 16: Full-height hero section with dynamic icon and background image
 * Features:
 * - Dynamic icon with subtitle
 * - Full-height (620px) hero layout
 * - Background image with dark overlay
 * - Dual CTA buttons with backdrop blur effect
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
    description: 'Full-height hero section with icon, background image, and dual CTA buttons',
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
