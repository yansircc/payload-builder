import { Field, GroupField } from 'payload'
import { link } from '@/fields/link'

const title: Field = {
  name: 'title',
  type: 'text',
  required: true,
  minLength: 1,
  maxLength: 100,
  defaultValue: 'Full-Width Banner Call to Action',
  admin: {
    description: 'The title of the CTA section',
  },
}

const subtitle: Field = {
  name: 'subtitle',
  type: 'text',
  defaultValue: 'Drive action with this high-impact, full-width banner design.',
  admin: {
    description: 'The subtitle text below the main title',
  },
}

const links: Field = {
  name: 'links',
  type: 'array',
  minRows: 1,
  maxRows: 2,
  admin: {
    description: 'Primary and secondary CTA buttons',
  },
  fields: [
    link({
      name: 'link',
      disableLabel: false,
      appearances: ['default', 'ghost'],
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
 * Complete configuration for CTA 10
 * Features:
 * - Full-width banner layout
 * - Dual action buttons
 * - High-impact design
 * - Clean, minimal style
 */
export const cta10Fields: GroupField = {
  name: 'cta-10',
  interfaceName: 'CTA10Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Full-width banner with dual action buttons',
  },
  fields: [title, subtitle, links],
}
