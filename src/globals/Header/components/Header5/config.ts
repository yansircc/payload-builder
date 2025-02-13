import { GroupField } from 'payload'
import { z } from 'zod'
import { link } from '@/fields/link'
import { createHeaderField, headerSchemas } from '../shared/base-field'

/**
 * Header 5 field validation and type definitions
 */
export const schemas = {
  logo: headerSchemas.logo,
  navigation: z.array(headerSchemas.link).min(1).max(5),
  auth: z.array(headerSchemas.link).min(0).max(2),
}

/**
 * Header 5 configuration
 *
 * This header includes:
 * - Icon with accent background
 * - Title and description
 * - Two links (primary and secondary)
 * - Header image
 */
export const header5Fields: GroupField = {
  name: 'header-5',
  interfaceName: 'Header5Fields',
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
              name: 'subMenus',
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
              minRows: 1,
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
