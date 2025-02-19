import { Field, GroupField } from 'payload'
import { link } from '@/fields/link'

const title: Field = {
  name: 'title',
  type: 'text',
  required: true,
  minLength: 1,
  maxLength: 100,
  defaultValue: 'Circular Pattern CTA',
  admin: {
    description: 'The title of the CTA section',
  },
}

const subtitle: Field = {
  name: 'subtitle',
  type: 'text',
  defaultValue: 'Engage your audience with our visually striking circular pattern design.',
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
          description: 'CTA button with ArrowRight suffix icon',
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

/**
 * Complete configuration for CTA 17
 * Features:
 * - Circular pattern background
 * - Centered content layout
 * - Dual action buttons
 * - Clean, minimal design
 */
export const cta17Fields: GroupField = {
  name: 'cta-17',
  interfaceName: 'CTA17Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'CTA with circular pattern background and dual action buttons',
  },
  fields: [title, subtitle, links],
}
