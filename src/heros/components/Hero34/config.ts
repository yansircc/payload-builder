import { GroupField } from 'payload'
import { z } from 'zod'
import { baseSchemas, heroBase } from '../shared/base-field'

/**
 * Hero 34 field validation and type definitions
 */
export const schemas = {
  ...baseSchemas,
  badge: z.string().describe('The badge text displayed above the title'),
}

/**
 * Complete configuration for Hero 34
 */
export const hero34Fields: GroupField = {
  name: 'hero-34',
  interfaceName: 'Hero34Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero with left content and right image layout',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: false,
      fields: [
        heroBase,
        {
          name: 'badge',
          type: 'text',
          label: 'Badge Text',
          defaultValue: 'New Release',
          maxLength: 15,
          admin: {
            description: 'Badge text displayed above the title (1-3 words recommended)',
          },
        },
      ],
      admin: {
        description: 'The hero content',
      },
    },
  ],
}
