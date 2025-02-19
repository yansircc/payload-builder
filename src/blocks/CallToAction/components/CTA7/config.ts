import { Field, GroupField } from 'payload'
import { icon } from '@/fields/icon'
import { link } from '@/fields/link'

const title: Field = {
  name: 'title',
  type: 'text',
  required: true,
  minLength: 1,
  maxLength: 100,
  defaultValue: 'Feature-Rich Call to Action',
  admin: {
    description: 'The title of the CTA section',
  },
}

const subtitle: Field = {
  name: 'subtitle',
  type: 'text',
  defaultValue: 'DISCOVER OUR KEY FEATURES AND BENEFITS',
  admin: {
    description: 'The subtitle text (in uppercase) below the main title',
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

const lists: Field = {
  name: 'lists',
  type: 'array',
  minRows: 1,
  maxRows: 6,
  admin: {
    description: 'List of features with icons',
  },
  fields: [
    {
      type: 'row',
      fields: [
        icon({
          name: 'icon',
          label: 'Icon',
        }),
        {
          name: 'text',
          type: 'text',
          required: true,
          admin: {
            description: 'Feature description',
          },
        },
      ],
    },
  ],
}

/**
 * Complete configuration for CTA 7
 * Features:
 * - Icon-based feature list
 * - Single action button
 * - Multiple feature points
 * - Clean, organized layout
 */
export const cta7Fields: GroupField = {
  name: 'cta-7',
  interfaceName: 'CTA7Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Feature list with icon highlights and single action button',
  },
  fields: [title, subtitle, links, lists],
}
