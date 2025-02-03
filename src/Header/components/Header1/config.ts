import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'
import { createHeaderField, headerSchemas } from '../shared/base-field'

/**
 * Header 1 field validation and type definitions
 */
export const schemas = {
  logo: headerSchemas.logo,
  menu: z.array(headerSchemas.link).min(1).max(5),
  auth: z.array(headerSchemas.link).min(0).max(2),
}

/**
 * Header 1 configuration
 *
 * This header includes:
 * - Icon with accent background
 * - Title and description
 * - Two links (primary and secondary)
 * - Header image
 */
export const header1Fields: GroupField = {
  name: 'header-1',
  interfaceName: 'Header1Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Header with image on the left',
  },
  fields: [
    createHeaderField({
      includeFields: ['title', 'logo'],
      arrays: [
        {
          name: 'menu',
          fields: [
            link({
              name: 'parentLink',
              overrides: {
                admin: {
                  description: 'Parent link',
                },
                defaultValue: {
                  appearance: 'link',
                },
              },
            }),
            {
              name: 'subMenu',
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
                {
                  name: 'description',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Description for this sub menu',
                  },
                },
              ],
              admin: {
                description: 'Links in this column',
              },
              minRows: 0,
              maxRows: 6,
            },
          ],
          admin: {
            description: 'Header navigation columns',
          },
          minRows: 1,
          maxRows: 5,
        },
        {
          name: 'rightSideLinks',
          label: 'Right side link',
          fields: [
            link({
              name: 'link',
              overrides: {
                admin: {
                  description: 'Right side link',
                },
              },
            }),
          ],
          minRows: 0,
          maxRows: 2,
        },
      ],
    }),
  ],
}
