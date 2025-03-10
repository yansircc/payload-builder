import { Field, GroupField } from 'payload'
import { link } from '@/fields/link'
import { featureFields } from '../../shared/base-field'

/**
 * Hero 25 field validation and type definitions
 */

const title: Field = {
  name: 'title',
  type: 'text',
  required: true,
  minLength: 1,
  maxLength: 100,
  admin: {
    description: 'The title of the Hero section',
  },
}

const logo: Field = {
  name: 'logo',
  type: 'upload',
  relationTo: 'media',
  admin: {
    description: 'The logo image',
  },
}

const badge: Field = {
  name: 'badge',
  type: 'text',
  admin: {
    description: 'Badge text displayed above title',
  },
}

const links: Field = {
  name: 'links',
  type: 'array',
  fields: [
    link({
      overrides: {
        admin: {
          description: 'Hero button',
        },
        defaultValue: {
          suffixIcon: 'MoveRight',
        },
      },
    }),
  ],
  minRows: 1,
  maxRows: 2,
  admin: {
    description: 'Hero buttons (1-2)',
  },
}

const features: Field = {
  name: 'features',
  type: 'array',
  fields: [featureFields.icon, featureFields.title],
  minRows: 1,
  maxRows: 4,
  admin: {
    description: 'Feature list (1-4 items)',
  },
}

/**
 * Complete configuration for Hero 25
 */
export const hero25Fields: GroupField = {
  name: 'hero-25',
  interfaceName: 'Hero25Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Centered hero with logo, badge and feature list',
  },
  fields: [title, logo, badge, links, features],
}
