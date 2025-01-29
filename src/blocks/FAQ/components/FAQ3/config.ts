import { GroupField } from 'payload'
import { createFAQField, faqSchemas } from '../shared/base-field'

/**
 * FAQ 3 field validation and type definitions
 */
export const schemas = {
  title: faqSchemas.title,
  faqs: faqSchemas.faqs,
}

/**
 * FAQ 3 configuration
 */
export const faq3Fields: GroupField = {
  name: 'faq-3',
  interfaceName: 'FAQ3Fields',
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
