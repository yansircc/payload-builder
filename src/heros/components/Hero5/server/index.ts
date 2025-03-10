import { Field, GroupField } from 'payload'
import { link } from '@/fields/link'

const title: Field = {
  name: 'title',
  type: 'text',
  required: true,
  minLength: 1,
  maxLength: 100,
  admin: {
    description: 'The title of the Hero section',
  },
}

const subtitle: Field = {
  name: 'subtitle',
  type: 'text',
  admin: {
    description: 'The subtitle of the Hero section',
  },
}

const image: Field = {
  name: 'image',
  type: 'upload',
  relationTo: 'media',
  admin: {
    description: 'The hero image',
  },
}

const links: Field = {
  name: 'links',
  type: 'array',
  fields: [
    link({
      name: 'link',
      overrides: {
        admin: {
          description: 'Hero button with ArrowRight prefix icon',
        },
        defaultValue: {
          prefixIcon: 'Download',
        },
      },
    }),
  ],
  admin: {
    description: 'Hero button',
  },
  minRows: 1,
  maxRows: 1,
}

/**
 * Complete configuration for Hero 5
 */
export const hero5Fields: GroupField = {
  name: 'hero-5',
  interfaceName: 'Hero5Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Left content right image layout hero, perfect for showcasing product features',
  },
  fields: [title, subtitle, image, links],
}
