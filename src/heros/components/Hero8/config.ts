import { GroupField } from 'payload'
import { baseSchemas, heroBase } from '../shared/base-field'

/**
 * Hero 8 field validation and type definitions
 */
export const schemas = {
  ...baseSchemas,
}

/**
 * Complete configuration for Hero 8
 */
export const hero8Fields: GroupField = {
  name: 'hero-8',
  interfaceName: 'Hero8Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero with centered layout and large bottom image',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: false,
      fields: [heroBase],
      admin: {
        description: 'The hero content',
      },
    },
  ],
}
