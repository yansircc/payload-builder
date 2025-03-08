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

const rating: Field = {
  name: 'rating',
  type: 'number',
  min: 0,
  max: 5,
  required: true,
  admin: {
    description: 'Rating value out of 5',
  },
}

const reviewCount: Field = {
  name: 'reviewCount',
  type: 'text',
  required: true,
  admin: {
    description: 'Text showing review count',
  },
}

const avatars: Field = {
  name: 'avatars',
  type: 'array',
  fields: [
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'User avatar image',
      },
    },
  ],
  admin: {
    description: 'Avatar images (exactly 5)',
  },
  minRows: 5,
  maxRows: 5,
}

const links: Field = {
  name: 'links',
  type: 'array',
  fields: [
    link({
      name: 'link',
      overrides: {
        admin: {
          description: 'Hero buttons',
        },
      },
    }),
  ],
  admin: {
    description: 'Hero buttons',
  },
  minRows: 0,
  maxRows: 2,
}

/**
 * Complete configuration for Hero 3
 */
export const hero3Fields: GroupField = {
  name: 'hero-3',
  interfaceName: 'Hero3Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero section with rating, avatars, and dual CTA buttons',
  },
  fields: [title, subtitle, image, rating, reviewCount, avatars, links],
}
