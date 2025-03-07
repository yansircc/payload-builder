import { Field, GroupField } from 'payload'
import { link } from '@/fields/link'

/**
 * Hero 115 field validation and type definitions
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
  type: 'text',
  required: false,
  admin: {
    description: 'Subtitle text',
  },
}

const trustText: Field = {
  name: 'trustText',
  type: 'text',
  required: false,
  admin: {
    description: 'Trust text displayed below the main content',
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

const links: Field = {
  name: 'links',
  type: 'array',
  fields: [
    link({
      name: 'link',
      overrides: {
        admin: {
          description: 'Hero button with Zap suffix icon',
        },
        defaultValue: {
          suffixIcon: 'Zap',
        },
      },
    }),
  ],
  admin: {
    description: 'Hero button',
  },
  minRows: 1,
  maxRows: 1,
}

/**
 * Complete configuration for Hero 115
 */
export const hero115Fields: GroupField = {
  name: 'hero-115',
  interfaceName: 'Hero115Fields',
  label: false,
  type: 'group',
  admin: {
    description:
      'Hero section with centered content, circular decorative borders, and a large image',
  },
  fields: [title, subtitle, trustText, image, links],
}
