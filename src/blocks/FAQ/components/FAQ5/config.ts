import { GroupField } from 'payload'
import { createFAQField, faqSchemas } from '../shared/base-field'

/**
 * FAQ 5 field validation and type definitions
 */
export const schemas = {
  title: faqSchemas.title,
  faqs: faqSchemas.faqs,
}

/**
 * FAQ 5 configuration
 */
export const faq5Fields: GroupField = {
  name: 'faq-5',
  interfaceName: 'FAQ5Fields',
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
