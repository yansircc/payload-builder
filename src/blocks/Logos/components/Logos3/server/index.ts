import { Field, GroupField } from 'payload'
import { basicFields, logosSchemas } from '../../shared/base-field'

/**
 * Logos3 field validation and type definitions
 */
export const schemas = {
  title: logosSchemas.title,
  logos: logosSchemas.logos,
}

const title: Field = {
  name: 'title',
  type: 'text',
  required: true,
  admin: {
    description: 'Main title text',
  },
}

const logos: Field = {
  name: 'logos',
  type: 'array',
  minRows: 7,
  maxRows: 12,
  fields: [basicFields.uploadField],
  admin: {
    description: 'Logo images (7-12)',
  },
}

/**
 * Complete configuration for Logos3
 */
export const logos3Fields: GroupField = {
  name: 'logos-3',
  interfaceName: 'Logos3Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Auto-scrolling logos carousel with gradient edges',
  },
  fields: [title, logos],
}
