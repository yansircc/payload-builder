import { GroupField } from 'payload'
import { createFAQField, faqSchemas } from '../shared/base-field'

/**
 * FAQ 4 field validation and type definitions
 */
export const schemas = {
  title: faqSchemas.title,
  faqs: faqSchemas.faqs,
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
    description: 'FAQ',
  },
  fields: [
    createFAQField({
      includeFields: ['title', 'faqs'],
    }),
  ],
}
