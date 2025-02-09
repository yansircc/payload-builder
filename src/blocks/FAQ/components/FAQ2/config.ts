import { GroupField } from 'payload'
import { createFAQField, faqSchemas, faqsFields } from '../shared/base-field'
import { faq2Mock } from './mock'

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
      fieldOverrides: {
        title: {
          defaultValue: faq2Mock.title,
        },
      },
      arrays: [
        {
          label: 'List FAQ:',
          name: 'faqs',
          fields: [
            {
              ...faqsFields.question,
              defaultValue: faq2Mock.faqs[0].question,
            },
            {
              ...faqsFields.answer,
              defaultValue: faq2Mock.faqs[0].answer,
            },
          ],
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
