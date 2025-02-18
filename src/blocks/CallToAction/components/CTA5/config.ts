import { Field, GroupField } from 'payload'
import { link } from '@/fields/link'

const title: Field = {
  name: 'title',
  type: 'text',
  required: true,
  minLength: 1,
  maxLength: 100,
  defaultValue: 'Image-Focused Call to Action',
  admin: {
    description: 'The title of the CTA section',
  },
}

const subtitle: Field = {
  name: 'subtitle',
  type: 'text',
  defaultValue: 'Engage your audience with a visually striking layout and compelling message.',
  admin: {
    description: 'The subtitle text below the main title',
  },
}

const image: Field = {
  name: 'image',
  type: 'upload',
  relationTo: 'media',
  required: true,
  admin: {
    description: 'The featured image that appears on the side',
  },
}

const links: Field = {
  name: 'links',
  type: 'array',
  minRows: 1,
  maxRows: 1,
  admin: {
    description: 'Primary CTA button',
  },
  fields: [
    link({
      name: 'link',
      disableLabel: false,
      appearances: ['default'],
      ui: {
        icons: true,
        description: false,
      },
      overrides: {
        admin: {
          description: 'CTA button',
        },
        defaultValue: {
          type: 'custom',
          url: '#',
          label: 'Get Started',
          appearance: 'default',
        },
      },
    }),
  ],
}

/**
 * Complete configuration for CTA 5
 * Features:
 * - Large image placement
 * - Side-by-side content structure
 * - Single action button
 * - Clean, minimal design
 */
export const cta5Fields: GroupField = {
  name: 'cta-5',
  interfaceName: 'CTA5Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Image-focused layout with side content and action button',
  },
  fields: [title, subtitle, image, links],
}
