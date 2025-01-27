import type { Block } from 'payload'

/**
 * Feature Block configuration
 */
export const Feature: Block = {
  slug: 'feature',
  interfaceName: 'FeatureBlock',
  fields: [
    {
      name: 'style',
      type: 'select',
      options: ['feature-1'],
      required: true,
      defaultValue: 'feature-1',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Main heading text',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Feature description text',
      },
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
      admin: {
        description: 'Lucide icon name (e.g., MessagesSquare)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Feature image',
      },
    },
    {
      name: 'primaryButton',
      type: 'group',
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: true,
          admin: {
            description: 'Button icon name (e.g., Play)',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Button text',
          },
        },
      ],
    },
    {
      name: 'secondaryButton',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Button text',
          },
        },
      ],
    },
  ],
}
