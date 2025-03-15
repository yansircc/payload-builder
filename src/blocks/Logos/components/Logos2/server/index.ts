import { Field, GroupField } from 'payload'
import { basicFields, logosSchemas } from '../../shared/base-field'

/**
 * Logos 2 field validation and type definitions
 */
export const schemas = {
  title: logosSchemas.title,
  description: logosSchemas.description,
  logos: logosSchemas.logos,
  link: logosSchemas.link,
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
  minRows: 6,
  maxRows: 6,
  fields: [basicFields.uploadField],
  admin: {
    description: 'Logo images (6 required)',
  },
}

const link = basicFields.link

/**
 * Complete configuration for Logos 2
 */
export const logos2Fields: GroupField = {
  name: 'logos-2',
  interfaceName: 'Logos2Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Logos component with a grid layout and a call-to-action button',
  },
  fields: [title, description, logos, link],
}
