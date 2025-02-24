import { Field, GroupField } from 'payload'
import { icon } from '@/fields/icon'
import { link } from '@/fields/link'

const title: Field = {
  name: 'title',
  type: 'text',
  required: true,
  minLength: 1,
  maxLength: 100,
  defaultValue: 'Accent Card with Features',
  admin: {
    description: 'The title of the CTA section',
  },
}

const subtitle: Field = {
  name: 'subtitle',
  type: 'text',
  defaultValue: 'Discover our key features and benefits with this engaging call-to-action.',
  admin: {
    description: 'The subtitle text below the main title',
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
          description: 'CTA button with arrow',
        },
        defaultValue: {
          type: 'custom',
          url: '#',
          label: 'Get Started',
          suffixIcon: 'ArrowRight',
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
 * Complete configuration for CTA 4
 * Features:
 * - Accent background color
 * - Icon-based feature list
 * - Single action button with arrow
 * - Compact card layout
 */
export const cta4Fields: GroupField = {
  name: 'cta-4',
  interfaceName: 'CTA4Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Accent card with feature list and single action button',
  },
  fields: [title, subtitle, links, lists],
}
