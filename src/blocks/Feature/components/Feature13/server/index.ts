import { Field, GroupField } from 'payload'

const title: Field = {
  name: 'title',
  type: 'text',
  required: true,
  defaultValue: 'Feature Title',
  admin: {
    description: 'The title of the feature',
  },
}

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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'The image of the feature',
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
  ],
}

export const feature13Fields: GroupField = {
  name: 'feature-13',
  interfaceName: 'Feature13Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Feature section with 6 cards showing icon, title, description and optional image',
  },
  fields: [title, features],
}
