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

const description: Field = {
  name: 'description',
  type: 'text',
  required: true,
  admin: {
    description: 'The description of the feature',
  },
}

const iconField = icon({
  name: 'icon',
  label: 'Icon',
})

const image: Field = {
  name: 'image',
  type: 'upload',
  relationTo: 'media',
  admin: {
    description: 'The image of the feature',
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
    icon({
      name: 'icon',
      label: 'Icon',
    }),
  ],
}

export const feature6Fields: GroupField = {
  name: 'feature-6',
  interfaceName: 'Feature6Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Feature section with 6 cards showing icon, title, description and optional image',
  },
  fields: [title, description, iconField, image, features],
}
