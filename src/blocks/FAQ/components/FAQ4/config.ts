import { ArrayField, Field, GroupField } from 'payload'
import { link } from '@/fields/link'

const title: Field = {
  name: 'title',
  type: 'text',
  required: true,
  minLength: 1,
  maxLength: 100,
  admin: {
    description: 'The title of the FAQ',
  },
}

const subtitle: Field = {
  name: 'subtitle',
  type: 'text',
  required: true,
  minLength: 1,
  admin: {
    description: 'The subtitle of the FAQ',
  },
}

const description: Field = {
  name: 'description',
  type: 'text',
  required: true,
  admin: {
    description: 'The description of the FAQ',
  },
}

const faqs: ArrayField = {
  name: 'faqs',
  type: 'array',
  required: true,
  minRows: 1,
  maxRows: 6,
  admin: {
    description: 'List FAQ',
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      minLength: 1,
      maxLength: 100,
      admin: {
        description: 'The question of the FAQ',
      },
    },
    {
      name: 'answer',
      type: 'text',
      required: true,
      minLength: 1,
    },
  ],
}

const support: GroupField = {
  name: 'support',
  type: 'group',
  admin: {
    description: 'Support section',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Support section title',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      admin: {
        description: 'Support section subtitle',
      },
    },
    {
      name: 'supportLink',
      type: 'array',
      minRows: 1,
      maxRows: 1,
      admin: {
        description: 'Support links',
      },
      fields: [
        link({
          name: 'link',
          overrides: {
            admin: {
              description: 'Support link',
            },
            defaultValue: {
              appearances: 'link',
            },
          },
        }),
      ],
    },
  ],
}

/**
 * FAQ 4 configuration
 */
export const faq4Fields: GroupField = {
  name: 'faq-4',
  interfaceName: 'FAQ4Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'FAQ with Description',
  },
  fields: [title, subtitle, description, faqs, support],
}
