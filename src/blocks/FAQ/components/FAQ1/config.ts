import { GroupField } from 'payload'
import { createFAQField, faqSchemas, faqsFields } from '../shared/base-field'
import { faq1Mock } from './mock'

/**
 * FAQ 1 field validation and type definitions
 */
export const schemas = {
  title: faqSchemas.title,
  faqs: faqSchemas.faqs,
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
  fields: [
    createFAQField({
      includeFields: ['title'],
      fieldOverrides: {
        title: {
          defaultValue: faq1Mock.title,
        },
      },
      arrays: [
        {
          label: 'List FAQ:',
          name: 'faqs',
          fields: [
            {
              ...faqsFields.question,
              defaultValue: faq1Mock.faqs[0].question,
            },
            {
              ...faqsFields.answer,
              defaultValue: faq1Mock.faqs[0].answer,
            },
          ],
          admin: {
            description: 'List FAQ',
            initCollapsed: false,
          },
          minRows: 1,
          maxRows: 6,
        },
      ],
    }),
  ],
}
