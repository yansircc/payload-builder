import { GroupField } from 'payload'
import { createFAQField, faqSchemas } from '../shared/base-field'

/**
 * FAQ 6 field validation and type definitions
 */
export const schemas = {
  title: faqSchemas.title,
  faqs: faqSchemas.faqs,
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
    description: 'FAQ',
  },
  fields: [
    createFAQField({
      includeFields: ['title', 'faqs'],
    }),
  ],
}
