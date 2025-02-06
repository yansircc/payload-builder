import { link } from '@/fields/link'
import { GroupField } from 'payload'
import { z } from 'zod'

import { createFAQField, faqSchemas, faqsFields } from '../shared/base-field'

/**
 * FAQ 3 field validation and type definitions
 */
export const schemas = {
  title: faqSchemas.title,
  faqs: faqSchemas.faqs,
  support: z.object({
    title: faqSchemas.title,
    subtitle: faqSchemas.subtitle,
    link: faqSchemas.link,
  }),
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
      includeFields: ['title', 'subtitle', 'faqs'],
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
