import { ArrayField, Field, GroupField } from 'payload'

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

/**
 * FAQ 6 configuration
 */
export const faq6Fields: GroupField = {
  name: 'faq-6',
  interfaceName: 'FAQ6Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'FAQ with Description',
  },
  fields: [title, subtitle, description, faqs],
}
