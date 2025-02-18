import { Field, GroupField } from 'payload'
import { link } from '@/fields/link'

const title: Field = {
  name: 'title',
  type: 'text',
  required: true,
  minLength: 1,
  maxLength: 100,
  defaultValue: 'Feature List with Actions',
  admin: {
    description: 'The title of the CTA section',
  },
}

const subtitle: Field = {
  name: 'subtitle',
  type: 'text',
  defaultValue:
    'Explore our key features and capabilities with easy access to detailed information.',
  admin: {
    description: 'The subtitle text below the main title',
  },
}

const buttonLinks: Field = {
  name: 'buttons',
  type: 'array',
  minRows: 1,
  maxRows: 2,
  admin: {
    description: 'Primary CTA buttons (1-2 buttons)',
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

const featureList: Field = {
  name: 'list',
  type: 'array',
  minRows: 1,
  maxRows: 5,
  admin: {
    description: 'List of feature links with descriptions',
  },
  fields: [
    link({
      name: 'link',
      appearances: ['ghost'],
      ui: {
        icons: true,
        description: true,
      },
      overrides: {
        admin: {
          description: 'Feature link with chevron',
        },
        defaultValue: {
          type: 'custom',
          url: '#',
          label: 'Feature Item',
          suffixIcon: 'ChevronRight',
          appearance: 'ghost',
        },
      },
    }),
  ],
}

/**
 * Complete configuration for CTA 3
 * Features:
 * - Primary CTA button with arrow
 * - Multiple feature links with chevron
 * - Optional descriptions for each feature
 * - Clean list-based layout
 */
export const cta3Fields: GroupField = {
  name: 'cta-3',
  interfaceName: 'CTA3Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Feature list layout with primary action and multiple feature links',
  },
  fields: [title, subtitle, buttonLinks, featureList],
}
