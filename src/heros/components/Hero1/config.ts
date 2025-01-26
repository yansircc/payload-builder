import { GroupField } from 'payload'
import { z } from 'zod'
import { baseSchemas, heroBase } from '../shared/base-field'

/**
 * Hero 1 field validation and type definitions
 */
export const schemas = {
  ...baseSchemas,
  badge: z.string().describe('The badge text on the top left of the hero'),
}

/**
 * Complete configuration for Hero 1
 */
export const hero1Fields: GroupField = {
  name: 'hero-1',
  interfaceName: 'Hero1Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero with a badge on the top left',
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
          defaultValue: 'New Release',
          admin: {
            description: 'The badge text on the top left of the hero',
          },
        },
      ],
      admin: {
        description: 'The hero cards',
      },
    },
  ],
}
