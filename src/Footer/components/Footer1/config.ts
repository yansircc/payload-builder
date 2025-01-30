import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'
import { createFooterField, footerSchemas } from '../shared/base-field'

/**
 * Footer 1 field validation and type definitions
 */
export const schemas = {
  title: footerSchemas.title,
  description: footerSchemas.description,
  image: footerSchemas.image,
  links: z.array(footerSchemas.link).min(2).max(2),
}

/**
 * Footer 1 configuration
 *
 * This footer includes:
 * - Icon with accent background
 * - Title and description
 * - Two links (primary and secondary)
 * - Footer image
 */
export const footer1Fields: GroupField = {
  name: 'footer-1',
  interfaceName: 'Footer1Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Footer with image on the right',
  },
  fields: [
    createFooterField({
      includeFields: ['image'],
      arrays: [
        {
          name: 'sections',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Title for this footer column',
              },
            },
            {
              name: 'links',
              type: 'array',
              fields: [
                link({
                  name: 'link',
                  overrides: {
                    admin: {
                      description: 'Navigation link',
                    },
                  },
                }),
              ],
              admin: {
                description: 'Links in this column',
              },
              minRows: 1,
              maxRows: 6,
            },
          ],
          admin: {
            description: 'Footer navigation columns',
          },
          minRows: 1,
          maxRows: 4,
        },
      ],
    }),
  ],
}
