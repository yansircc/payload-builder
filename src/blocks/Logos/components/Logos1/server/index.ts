import { Field, GroupField } from 'payload'
import { basicFields, logosSchemas } from '../../shared/base-field'

/**
 * Logos 1 field validation and type definitions
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
  minRows: 1,
  maxRows: 5,
  fields: [basicFields.uploadField],
  admin: {
    description: 'Logo images (1-5)',
  },
}

/**
 * Complete configuration for Logos 1
 */
export const logos1Fields: GroupField = {
  name: 'logos-1',
  interfaceName: 'Logos1Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'A simple logos component with grayscale effect and title',
  },
  fields: [title, logos],
}
