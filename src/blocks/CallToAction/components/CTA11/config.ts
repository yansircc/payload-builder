import { Field, GroupField } from 'payload'
import { link } from '@/fields/link'

const title: Field = {
  name: 'title',
  type: 'text',
  required: true,
  minLength: 1,
  maxLength: 100,
  defaultValue: 'Dual Action Call to Action',
  admin: {
    description: 'The title of the CTA section',
  },
}

const subtitle: Field = {
  name: 'subtitle',
  type: 'text',
  defaultValue: 'Choose your preferred action with our dual-button layout.',
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
 * Complete configuration for CTA 11
 * Features:
 * - Dual action buttons
 * - Clean, minimal layout
 * - Clear call-to-action hierarchy
 * - Focused user journey
 */
export const cta11Fields: GroupField = {
  name: 'cta-11',
  interfaceName: 'CTA11Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'CTA with dual action buttons',
  },
  fields: [title, subtitle, links],
}
