import { GroupField } from 'payload'
import { z } from 'zod'
import { link } from '@/fields/link'
import { createFooterField, footerSchemas } from '../shared/base-field'

/**
 * Footer 8 field validation and type definitions
 */
export const schemas = {
  image: footerSchemas.image,
  sections: z.array(footerSchemas.link).min(8).max(8),
}

/**
 * Footer 8 configuration
 *
 * This footer includes:
 * - Icon with accent background
 * - Title and description
 * - Two links (primary and secondary)
 * - Footer image
 */
export const footer8Fields: GroupField = {
  name: 'footer-8',
  interfaceName: 'Footer8Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Footer with image on the left',
  },
  fields: [
    createFooterField({
      includeFields: ['title', 'subtitle', 'logo'],
      groups: [
        {
          name: 'socialLinks',
          label: 'Social Links',
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
                  disableLabel: true,
                }),
              ],
              minRows: 0,
              maxRows: 5,
            },
          ],
        },
        {
          name: 'bottomText',
          label: 'Bottom text',
          fields: ['copyright', 'description'],
        },
      ],
      arrays: [
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
          maxRows: 2,
        },
      ],
    }),
  ],
}
