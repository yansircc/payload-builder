import { Field, GroupField } from 'payload'
import { link } from '@/fields/link'

/**
 * Hero 8 field validation and type definitions
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

const links: Field = {
  name: 'links',
  type: 'array',
  fields: [
    link({
      name: 'link',
      overrides: {
        admin: {
          description: 'Hero button with ChevronRight suffix icon',
        },
        defaultValue: {
          suffixIcon: 'ChevronRight',
        },
      },
    }),
  ],
  admin: {
    description: 'Hero buttons (exactly 2)',
  },
  minRows: 2,
  maxRows: 2,
}

/**
 * Complete configuration for Hero 8
 */
export const hero8Fields: GroupField = {
  name: 'hero-8',
  interfaceName: 'Hero8Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero with centered layout and large bottom image',
  },
  fields: [title, subtitle, image, links],
}
