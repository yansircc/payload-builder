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

const heroLink: Field = link({
  name: 'link',
  overrides: {
    admin: {
      description: 'Hero button',
    },
  },
})

const rating: Field = {
  name: 'rating',
  type: 'group',
  admin: {
    description: 'Rating information',
  },
  fields: [
    {
      name: 'rate',
      type: 'number',
      min: 0,
      max: 5,
      required: true,
      admin: {
        description: 'Rating value (0-5)',
      },
    },
    {
      name: 'count',
      type: 'number',
      min: 0,
      required: true,
      admin: {
        description: 'Number of ratings',
      },
    },
    {
      name: 'avatars',
      type: 'array',
      fields: [
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'User avatar',
          },
        },
      ],
      minRows: 3,
      maxRows: 5,
      admin: {
        description: 'User avatars (3-5)',
      },
    },
  ],
}

/**
 * Complete configuration for Hero 7
 */
export const hero7Fields: GroupField = {
  name: 'hero-7',
  interfaceName: 'Hero7Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Hero with a rating on the center',
  },
  fields: [title, subtitle, heroLink, rating],
}
