import { Field, GroupField } from 'payload'
import { icon } from '@/fields/icon'

const features: Field = {
  name: 'features',
  type: 'array',
  required: true,
  minRows: 2,
  maxRows: 2,
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

const testimonial: Field = {
  name: 'testimonial',
  type: 'group',
  admin: {
    description: 'The testimonial of the feature',
  },
  fields: [
    {
      name: 'quote',
      type: 'text',
      required: true,
      admin: {
        description: 'The quote of the testimonial',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'The name of the testimonial',
      },
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      admin: {
        description: 'The role of the testimonial',
      },
    },
    {
      name: 'company',
      type: 'text',
      required: true,
      admin: {
        description: 'The company of the testimonial',
      },
    },
    {
      name: 'image',
      type: 'upload',
      required: false,
      relationTo: 'media',
      admin: {
        description: 'The image of the testimonial',
      },
    },
  ],
}

export const feature5Fields: GroupField = {
  name: 'feature-5',
  interfaceName: 'Feature5Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Feature section with 2 cards (first one larger) and testimonial',
  },
  fields: [features, testimonial],
}
