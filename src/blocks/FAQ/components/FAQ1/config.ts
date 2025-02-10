import { GroupField } from 'payload'
import { createFAQField, faqsFields } from '../shared/base-field'
import { mockData } from './data/mock'

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
          defaultValue: mockData.title,
        },
      },
      arrays: [
        {
          label: 'List FAQ:',
          name: 'faqs',
          fields: [
            {
              ...faqsFields.question,
              type: 'text',
              admin: {
                components: {
                  Field: '/blocks/FAQ/components/FAQ1/fields/FAQField',
                },
              },
            },
            {
              ...faqsFields.answer,
              type: 'text',
              admin: {
                components: {
                  Field: '/blocks/FAQ/components/FAQ1/fields/FAQField',
                },
              },
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
