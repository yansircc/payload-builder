import { Field, GroupField } from 'payload'
import { link } from '@/fields/link'
import { partnerFields } from '../../shared/base-field'

/**
 * Hero 12 field validation and type definitions
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
      name: 'link',
    }),
  ],
  minRows: 1,
  maxRows: 2,
  admin: {
    description: 'Hero buttons (1-2)',
  },
}

const partners: Field = {
  name: 'partners',
  type: 'array',
  fields: [partnerFields.logo],
  minRows: 1,
  maxRows: 6,
  admin: {
    description: 'Partner logos (1-6)',
  },
}

/**
 * Complete configuration for Hero 12
 */
export const hero12Fields: GroupField = {
  name: 'hero-12',
  interfaceName: 'Hero12Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero with logo, badge and partner logos',
  },
  fields: [title, subtitle, logo, badge, links, partners],
}
