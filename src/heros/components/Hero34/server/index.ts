import { Field, GroupField } from 'payload'
import { link } from '@/fields/link'

/**
 * Hero 34 field validation and type definitions
 */

const title: Field = {
  name: 'title',
  type: 'text',
  required: true,
  admin: {
    description: 'The main title text',
  },
}

const subtitle: Field = {
  name: 'subtitle',
  type: 'textarea',
  admin: {
    description: 'The subtitle text',
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

const badge: Field = {
  name: 'badge',
  type: 'text',
  required: true,
  admin: {
    description: 'Badge text',
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
  admin: {
    description: 'Hero buttons',
  },
  minRows: 1,
  maxRows: 1,
}

/**
 * Complete configuration for Hero 34
 */
export const hero34Fields: GroupField = {
  name: 'hero-34',
  interfaceName: 'Hero34Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero with left content and right image layout',
  },
  fields: [title, subtitle, image, badge, links],
}
