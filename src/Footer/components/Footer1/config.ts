import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'
import { createFooterField, footerSchemas } from '../shared/base-field'

/**
 * Footer 1 field validation and type definitions
 */
export const schemas = {
  image: footerSchemas.image,
  sections: z.array(footerSchemas.link).min(2).max(2),
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
    description: 'Footer with image on the left',
  },
  fields: [
    createFooterField({
      includeFields: ['logo', 'copyright'],
      groups: [
        {
          name: 'rightLinks',
          label: 'Right Links',
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
                      prefixIcon: 'Linkedin',
                    },
                  },
                  disableLabel: true,
                }),
              ],
              minRows: 0,
              maxRows: 2,
              admin: {
                description: 'Support cards',
              },
            },
          ],
          admin: {
            description: 'Support list',
          },
        },
      ],
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
          maxRows: 4,
        },
      ],
    }),
  ],
}
