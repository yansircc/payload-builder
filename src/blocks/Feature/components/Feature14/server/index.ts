import { Field, GroupField } from 'payload'
import { icon } from '@/fields/icon'

const features: Field = {
  name: 'features',
  type: 'array',
  required: true,
  minRows: 2,
  maxRows: 3,
  admin: {
    description: 'The features of the feature',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'The title of the feature',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      required: true,
      admin: {
        description: 'The description of the feature',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'The image of the feature',
      },
    },
    {
      name: 'list',
      type: 'array',
      required: true,
      minRows: 2,
      admin: {
        description: 'The list of the feature',
      },
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
            description: 'The text of the feature',
          },
        },
      ],
    },
  ],
}

export const feature14Fields: GroupField = {
  name: 'feature-14',
  interfaceName: 'Feature14Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Feature section with 6 cards showing icon, title, description and optional image',
  },
  fields: [features],
}
