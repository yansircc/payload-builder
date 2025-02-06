import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import type { CollectionConfig } from 'payload'

export const Popups: CollectionConfig = {
  slug: 'popups',
  admin: {
    useAsTitle: 'title',
    description:
      'Create popups that can be linked to from anywhere in the site.',
  },
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Popup Title',
      admin: {
        description: 'The title that will be displayed in the popup',
      },
    },
    ...slugField(),
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Enable Popup',
      defaultValue: false,
      admin: {
        description: 'Toggle to enable/disable this popup',
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
      admin: {
        description: 'The content that will be displayed in the popup',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'ctaLabel',
          type: 'text',
          required: true,
          label: 'CTA Label',
          admin: {
            description: 'Text for the call-to-action button',
            width: '50%',
          },
        },
        {
          name: 'ctaStyle',
          type: 'select',
          required: true,
          defaultValue: 'default',
          options: [
            { label: 'Primary', value: 'default' },
            { label: 'Secondary', value: 'outline' },
            { label: 'Ghost', value: 'ghost' },
          ],
          admin: {
            description: 'Style of the CTA button',
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          label: 'CTA Type',
          type: 'select',
          defaultValue: 'reference',
          options: [
            {
              label: 'Page Reference',
              value: 'reference',
            },
            {
              label: 'Custom URL',
              value: 'custom',
            },
          ],
        },
        {
          name: 'reference',
          label: 'Page Reference',
          type: 'relationship',
          relationTo: ['pages', 'posts'],
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'reference',
          },
        },
        {
          name: 'url',
          label: 'Custom URL',
          type: 'text',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'custom',
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data.slug && data.title) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '')
        }
        return data
      },
    ],
  },
}
