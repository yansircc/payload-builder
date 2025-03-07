import { Field, GroupField } from 'payload'
import { featureFields } from '../../shared/base-field'

/**
 * Hero 45 field validation and type definitions
 */

const badge: Field = {
  name: 'badge',
  type: 'text',
  required: true,
  admin: {
    description: 'Badge text',
  },
}

const title: Field = {
  name: 'title',
  type: 'text',
  required: true,
  admin: {
    description: 'The main title text',
  },
}

const image: Field = {
  name: 'image',
  type: 'upload',
  relationTo: 'media',
  required: true,
  admin: {
    description: 'Hero image',
  },
}

const features: Field = {
  name: 'features',
  type: 'array',
  fields: [featureFields.icon, featureFields.title, featureFields.description],
  admin: {
    description: 'Feature list',
  },
  minRows: 0,
  maxRows: 3,
}

/**
 * Complete configuration for Hero45
 */
export const hero45Fields: GroupField = {
  name: 'hero-45',
  interfaceName: 'Hero45Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero section with badge, title, image, and three features',
  },
  fields: [badge, title, image, features],
}
