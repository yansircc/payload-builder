import { Field, GroupField } from 'payload'
import { link } from '@/fields/link'

const title: Field = {
  name: 'title',
  type: 'text',
  required: true,
  admin: {
    description: 'The title of the CTA section',
  },
}

const subtitle: Field = {
  name: 'subtitle',
  type: 'text',
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
      appearances: ['default'],
      ui: {
        icons: true,
      },
      overrides: {
        admin: {
          description: 'Primary CTA button with arrow',
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
    {
      type: 'row',
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
              width: '50%',
            },
          },
        }),
        {
          name: 'description',
          type: 'text',
          required: true,
          admin: {
            description: 'Brief description of the feature',
            width: '50%',
          },
        },
      ],
    },
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
