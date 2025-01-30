import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { createFAQField, faqSchemas, faqsFields } from '../shared/base-field'

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
      includeFields: ['subtitle', 'title', 'description'],
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
