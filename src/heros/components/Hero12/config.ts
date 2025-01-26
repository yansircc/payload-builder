import { GroupField } from 'payload'
import { z } from 'zod'
import { baseSchemas, heroBase } from '../shared/base-field'

/**
 * Hero 12 field validation and type definitions
 */
export const schemas = {
  ...baseSchemas,
  logo: z.object({}).describe('The logo image displayed at the top'),
  badge: z.string().describe('The badge text displayed below the logo'),
  partners: z
    .array(
      z.object({
        logo: z.object({}).describe('Partner logo image'),
      }),
    )
    .describe('List of partner logos'),
}

/**
 * Complete configuration for Hero 12
 */
export const hero12Fields: GroupField = {
  name: 'hero-12',
  interfaceName: 'Hero12Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero with logo, badge and partner logos',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: false,
      fields: [
        heroBase,
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo',
          admin: {
            description: 'The main logo image',
          },
        },
        {
          name: 'badge',
          type: 'text',
          defaultValue: 'UI Blocks',
          admin: {
            description: 'Badge text displayed below the logo',
          },
        },
        {
          name: 'partners',
          type: 'array',
          label: 'Partners',
          admin: {
            description: 'Partner logo list',
          },
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Partner logo (recommended size: 100x100)',
              },
            },
          ],
        },
      ],
      admin: {
        description: 'The hero content',
      },
    },
  ],
}
