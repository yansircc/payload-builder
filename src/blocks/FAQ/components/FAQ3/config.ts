import { GroupField } from 'payload'
import { link } from '@/fields/link'
import { createFAQField, faqsFields } from '../shared/base-field'
import { mockData } from './data/mock'

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
      includeFields: ['title', 'subtitle'],
      fieldOverrides: {
        title: {
          defaultValue: mockData.title,
        },
        subtitle: {
          defaultValue: mockData.subtitle,
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
                  Field: '/blocks/FAQ/components/FAQ3/fields/FAQField',
                },
              },
            },
            {
              ...faqsFields.answer,
              type: 'text',
              admin: {
                components: {
                  Field: '/blocks/FAQ/components/FAQ3/fields/FAQField',
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
      groups: [
        {
          name: 'support',
          label: 'Support',
          fields: ['title', 'subtitle'],
          arrays: [
            {
              name: 'supportLink',
              fields: [
                link({
                  name: 'link',
                  overrides: {
                    admin: {
                      description: 'Support link',
                    },
                    defaultValue: {
                      appearances: 'link',
                    },
                  },
                }),
              ],
              minRows: 1,
              maxRows: 1,
              admin: {
                description: 'Support link',
              },
            },
          ],
          admin: {
            description: 'Support list',
          },
        },
      ],
    }),
  ],
}
