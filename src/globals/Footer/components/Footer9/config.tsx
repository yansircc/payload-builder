import { GroupField } from 'payload'
import { z } from 'zod'
import { link } from '@/fields/link'
import { createFooterField, footerSchemas } from '../shared/base-field'

/**
 * Footer 9 field validation and type definitions
 */
export const schemas = {
  image: footerSchemas.image,
  sections: z.array(footerSchemas.link).min(9).max(9),
}

/**
 * Footer 9 configuration
 *
 * This footer includes:
 * - Icon with accent background
 * - Title and description
 * - Two links (primary and secondary)
 * - Footer image
 */
export const footer9Fields: GroupField = {
  name: 'footer-9',
  interfaceName: 'Footer9Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Footer with image on the left',
  },
  fields: [
    createFooterField({
      includeFields: ['title', 'subtitle', 'copyright'],
      groups: [
        {
          name: 'socialLinks',
          label: 'Social Links',
          fields: ['title'],
          arrays: [
            {
              name: 'links',
              fields: [
                link({
                  name: 'link',
                  overrides: {
                    admin: {
                      description: 'Link',
                    },
                    defaultValue: {
                      appearance: 'link',
                    },
                  },
                }),
              ],
              minRows: 0,
              maxRows: 5,
            },
          ],
        },
        {
          name: 'leftLinks',
          label: 'Left Links',
          fields: ['links'],
          arrays: [
            {
              name: 'links',
              fields: [
                link({
                  name: 'link',
                  overrides: {
                    admin: {
                      description: 'Link',
                    },
                    defaultValue: {
                      appearance: 'link',
                    },
                  },
                }),
              ],
              minRows: 0,
              maxRows: 3,
            },
          ],
        },
      ],
      arrays: [
        {
          name: 'links',
          label: 'Footer buttons',
          fields: [
            link({
              name: 'link',
            }),
          ],
          minRows: 1,
          maxRows: 2,
        },
        {
          name: 'sections',
          label: 'Footer sections',
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
                    defaultValue: {
                      appearance: 'link',
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
          maxRows: 5,
        },
      ],
    }),
  ],
}
