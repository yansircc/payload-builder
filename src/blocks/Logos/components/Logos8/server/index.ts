import { Field, GroupField } from 'payload'
import { basicFields, logosSchemas } from '../../shared/base-field'

/**
 * Logos8 field validation and type definitions
 */
export const schemas = {
  title: logosSchemas.title,
  subtitle: logosSchemas.description,
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

const description: Field = {
  name: 'description',
  type: 'textarea',
  admin: {
    description: 'Description text',
  },
}

const logos: Field = {
  name: 'logos',
  type: 'array',
  minRows: 1,
  maxRows: 12,
  fields: [basicFields.uploadField],
  admin: {
    description: 'Logo images (1-12)',
  },
}

/**
 * Complete configuration for Logos8
 */
export const logos8Fields: GroupField = {
  name: 'logos-8',
  interfaceName: 'Logos8Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Logos grid with title, subtitle, and custom logo sizes',
  },
  fields: [title, description, logos],
}
