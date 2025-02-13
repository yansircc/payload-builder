import { GroupField } from 'payload'
import { z } from 'zod'
import { link } from '@/fields/link'
import { createFooterField, footerSchemas } from '../shared/base-field'

/**
 * Footer 10 field validation and type definitions
 */
export const schemas = {
  image: footerSchemas.image,
  sections: z.array(footerSchemas.link).min(10).max(10),
}

/**
 * Footer 10 configuration
 *
 * This footer includes:
 * - Icon with accent background
 * - Title and description
 * - Two links (primary and secondary)
 * - Footer image
 */
export const footer10Fields: GroupField = {
  name: 'footer-10',
  interfaceName: 'Footer10Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Footer with image on the left',
  },
  fields: [
    createFooterField({
      includeFields: ['logo'],
      groups: [
        {
          name: 'bottomText',
          label: 'Bottom text',
          fields: ['copyright', 'description'],
        },
      ],
    }),
  ],
}
