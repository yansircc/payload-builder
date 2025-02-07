import { GroupField } from 'payload'
import { z } from 'zod'
import { link } from '@/fields/link'
import { createHeaderField, headerSchemas } from '../shared/base-field'
import { style1Submenu } from './components/submenu/style1/config'
import { style2Submenu } from './components/submenu/style2/config'
import { style3Submenu } from './components/submenu/style3/config'
import { style4Submenu } from './components/submenu/style4/config'

/**
 * Header 3 field validation and type definitions
 */
export const schemas = {
  logo: headerSchemas.logo,
  menu: z.array(headerSchemas.link).min(3).max(5),
  auth: z.array(headerSchemas.link).min(0).max(2),
}

/**
 * Header 3 configuration
 *
 * This header includes:
 * - Icon with accent background
 * - Title and description
 * - Two links (primary and secondary)
 * - Header image
 */
export const header3Fields: GroupField = {
  name: 'header-3',
  interfaceName: 'Header3Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Header with image on the left',
  },
  fields: [
    createHeaderField({
      includeFields: ['logo'],
      arrays: [
        {
          name: 'rightLinks',
          label: 'Right side',
          fields: [
            link({
              name: 'link',
            }),
          ],
          minRows: 0,
          maxRows: 2,
        },
      ],
    }),
    {
      name: 'menu',
      type: 'array',
      label: 'Menu Configuration',
      fields: [
        link({
          name: 'parentMenu',
          overrides: {
            admin: {
              description: 'Menu',
            },
          },
        }),
        {
          name: 'submenu',
          type: 'group',
          label: 'Submenu Configuration',
          fields: [
            {
              name: 'style',
              type: 'select',
              required: false,
              options: [
                {
                  label: 'Style 1',
                  value: 'style-1',
                },
                {
                  label: 'Style 2',
                  value: 'style-2',
                },
                {
                  label: 'Style 3',
                  value: 'style-3',
                },
                {
                  label: 'Style 4',
                  value: 'style-4',
                },
              ],
            },
            {
              name: 'style1Config',
              type: 'group',
              label: 'Style 1 Menu Config',
              admin: {
                condition: (_, siblingData) => siblingData?.style === 'style-1',
              },
              fields: style1Submenu,
            },
            {
              name: 'style2Config',
              type: 'group',
              label: 'Style 2 Menu Config',
              admin: {
                condition: (_, siblingData) => siblingData?.style === 'style-2',
              },
              fields: style2Submenu,
            },
            {
              name: 'style3Config',
              type: 'group',
              label: 'Style 3 Menu Config',
              admin: {
                condition: (_, siblingData) => siblingData?.style === 'style-3',
              },
              fields: style3Submenu,
            },
            {
              name: 'style4Config',
              type: 'group',
              label: 'Style 4 Menu Config',
              admin: {
                condition: (_, siblingData) => siblingData?.style === 'style-4',
              },
              fields: style4Submenu,
            },
          ],
        },
      ],
    },
  ],
}
