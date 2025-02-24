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

const subtitle: Field = {
  name: 'subtitle',
  type: 'text',
  required: true,
  admin: {
    description: 'The subtitle of the feature',
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

export const feature15Fields: GroupField = {
  name: 'feature-15',
  interfaceName: 'Feature15Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Feature section with 6 cards showing icon, title, description and optional image',
  },
  fields: [title, subtitle, description, features],
}
