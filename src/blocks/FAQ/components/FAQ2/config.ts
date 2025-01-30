import { GroupField } from 'payload'
import { createFAQField, faqSchemas, faqsFields } from '../shared/base-field'

/**
 * FAQ 2 field validation and type definitions
 */
export const schemas = {
  title: faqSchemas.title,
  faqs: faqSchemas.faqs,
}

/**
 * FAQ 2 configuration
 */
export const faq2Fields: GroupField = {
  name: 'faq-2',
  interfaceName: 'FAQ2Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'FAQ',
  },
  fields: [
    createFAQField({
      includeFields: ['title'],
      arrays: [
        {
          label: 'List FAQ:',
          name: 'faqs',
          fields: Object.values(faqsFields),
          admin: {
            description: 'List with icons',
          },
          minRows: 1,
          maxRows: 6,
        },
      ],
    }),
  ],
}
