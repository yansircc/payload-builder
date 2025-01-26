import { GroupField } from 'payload'
import { baseSchemas, heroBase } from '../shared/base-field'

/**
 * Hero 5 field validation and type definitions
 */
export const schemas = baseSchemas

/**
 * Complete configuration for Hero 5
 */
export const hero5Fields: GroupField = {
  name: 'hero-5',
  interfaceName: 'Hero5Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Left content right image layout hero, perfect for showcasing product features',
  },
  fields: [heroBase],
}
