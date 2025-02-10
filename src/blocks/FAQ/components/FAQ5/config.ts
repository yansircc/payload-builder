import { GroupField } from 'payload'
import { createFAQField, faqsFields } from '../shared/base-field'

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
      includeFields: ['title', 'subtitle', 'description'],
      arrays: [
        {
          label: 'List FAQ:',
          name: 'faqs',
          fields: Object.values(faqsFields),
          admin: {
            description: 'List FAQ',
          },
          minRows: 1,
          maxRows: 6,
        },
      ],
    }),
  ],
}
