import { Field, GroupField } from 'payload'
import { icon } from '@/fields/icon'
import { link } from '@/fields/link'

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
  defaultValue: 'Feature Description',
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
  required: true,
  admin: {
    description: 'The image of the feature',
  },
}

const buttonGroup: Field = {
  name: 'buttonGroup',
  type: 'array',
  minRows: 2,
  maxRows: 2,
  admin: {
    description: 'Primary CTA buttons (1-2 buttons)',
  },
  fields: [
    link({
      name: 'link',
      appearances: ['default', 'outline', 'ghost', 'link'],
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

export const feature2Fields: GroupField = {
  name: 'feature-2',
  interfaceName: 'Feature2Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Feature with image on the right',
  },
  fields: [title, description, iconField, image, buttonGroup],
}
