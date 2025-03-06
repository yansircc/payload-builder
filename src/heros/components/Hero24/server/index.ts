import { Field, GroupField } from 'payload'
import { link } from '@/fields/link'
import { featureFields } from '../../shared/base-field'

/**
 * Hero 24 field validation and type definitions
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

const subtitle: Field = {
  name: 'subtitle',
  type: 'text',
  admin: {
    description: 'The subtitle of the Hero section',
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
          description: 'Hero button with MoveRight suffix icon',
        },
        defaultValue: {
          suffixIcon: 'MoveRight',
        },
      },
    }),
  ],
  minRows: 1,
  maxRows: 1,
  admin: {
    description: 'Hero button',
  },
}

const features: Field = {
  name: 'features',
  type: 'array',
  fields: [featureFields.icon, featureFields.title, featureFields.description],
  minRows: 4,
  maxRows: 4,
  admin: {
    description: 'Feature list (exactly 4 items)',
  },
}

/**
 * Complete configuration for Hero 24
 */
export const hero24Fields: GroupField = {
  name: 'hero-24',
  interfaceName: 'Hero24Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero with logo, badge and feature list',
  },
  fields: [title, subtitle, logo, badge, links, features],
}
