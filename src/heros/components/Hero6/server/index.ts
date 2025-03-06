import { Field, GroupField } from 'payload'
import { link } from '@/fields/link'
import { mediaFields } from '../../shared/base-field'

/**
 * Hero 6 field validation and type definitions
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

const image: Field = {
  name: 'image',
  type: 'upload',
  relationTo: 'media',
  admin: {
    description: 'The hero image',
  },
}

const secondaryImage: Field = {
  name: 'secondaryImage',
  type: 'group',
  admin: {
    description: 'Secondary image with button',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Secondary image',
      },
    },
  ],
}

const links: Field = {
  name: 'links',
  type: 'array',
  fields: [
    link({
      overrides: {
        defaultValue: { suffixIcon: 'ChevronRight' },
      },
    }),
  ],
  minRows: 3,
  maxRows: 3,
  admin: {
    description: 'Hero buttons (exactly 3)',
  },
}

const partners: Field = {
  name: 'partners',
  type: 'array',
  fields: [mediaFields.logo],
  minRows: 4,
  maxRows: 4,
  admin: {
    description: 'Partner logos (exactly 4)',
  },
}

/**
 * Complete configuration for Hero 6
 */
export const hero6Fields: GroupField = {
  name: 'hero-6',
  interfaceName: 'Hero6Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero with two images and partner logos',
  },
  fields: [title, subtitle, image, secondaryImage, links, partners],
}
