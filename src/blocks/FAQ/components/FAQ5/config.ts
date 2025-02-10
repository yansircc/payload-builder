import { GroupField } from 'payload'
import { createFAQField, faqsFields } from '../shared/base-field'
import { mockData } from './data/mock'

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
      fieldOverrides: {
        title: {
          defaultValue: mockData.title,
        },
        subtitle: {
          defaultValue: mockData.subtitle,
        },
        description: {
          defaultValue: mockData.description,
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
                  Field: '/blocks/FAQ/components/FAQ5/fields/FAQField',
                },
              },
            },
            {
              ...faqsFields.answer,
              type: 'text',
              admin: {
                components: {
                  Field: '/blocks/FAQ/components/FAQ5/fields/FAQField',
                },
              },
            },
          ],
          admin: {
            description: 'List FAQ',
            initCollapsed: true,
          },
          minRows: 1,
          maxRows: 6,
        },
      ],
    }),
  ],
}
