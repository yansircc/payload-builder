import { Field, GroupField } from 'payload'
import { icon } from '@/fields/icon'

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
      type: 'text',
      required: true,
      admin: {
        description: 'The description of the feature',
      },
    },
    icon({
      name: 'icon',
      label: 'Icon',
    }),
    {
      name: 'image',
      type: 'upload',
      required: false,
      relationTo: 'media',
      admin: {
        description: 'The image of the feature',
      },
    },
  ],
}

export const feature3Fields: GroupField = {
  name: 'feature-3',
  interfaceName: 'Feature3Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Feature section with 6 cards showing icon, title, description and optional image',
  },
  fields: [title, features],
}
