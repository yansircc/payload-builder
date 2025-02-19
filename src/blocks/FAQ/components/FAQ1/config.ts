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
 * FAQ 1 configuration
 */
export const faq1Fields: GroupField = {
  name: 'faq-1',
  interfaceName: 'FAQ1Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'FAQ',
  },
  fields: [title, faqs],
}
