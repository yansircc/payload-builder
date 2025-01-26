import { GroupField } from 'payload'
import { z } from 'zod'
import { baseSchemas, heroBase } from '../shared/base-field'

/**
 * Hero 24 field validation and type definitions
 */
export const schemas = {
  ...baseSchemas,
  logo: z.object({}).describe('The logo image displayed at the top'),
  badge: z.string().describe('The badge text displayed above the title'),
  features: z
    .array(
      z.object({
        icon: z.string().describe('Lucide icon name'),
        title: z.string().describe('Feature title'),
        description: z.string().describe('Feature description'),
      }),
    )
    .length(4)
    .describe('List of features with icons'),
}

/**
 * Complete configuration for Hero 24
 */
export const hero24Fields: GroupField = {
  name: 'hero-24',
  interfaceName: 'Hero24Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero with centered layout and feature list',
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
          label: 'Logo',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Top logo image (recommended size: 112x112, WebP format)',
          },
        },
        {
          name: 'badge',
          type: 'text',
          defaultValue: 'PLATFORM',
          admin: {
            description: 'Badge text displayed above the title',
          },
        },
        {
          name: 'features',
          type: 'array',
          label: 'Features',
          minRows: 4,
          maxRows: 4,
          admin: {
            description: 'Feature list (fixed to 4 items)',
          },
          fields: [
            {
              name: 'icon',
              type: 'text',
              required: true,
              defaultValue: 'Globe',
              admin: {
                description: 'Lucide icon name (e.g., Globe, Rocket, Wrench, Star)',
                placeholder: 'Enter lucide-icons name',
              },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Feature title (2-3 words recommended)',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Feature description (one sentence recommended)',
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
