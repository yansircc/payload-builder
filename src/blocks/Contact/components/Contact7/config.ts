import { GroupField } from 'payload'
import { z } from 'zod'
import { link } from '@/fields/link'
import { cardsFields, contactSchemas, createContactField } from '../shared/base-field'

/**
 * Contact 7 field validation and type definitions
 */
export const schemas = {
  title: contactSchemas.title,
  subtitle: contactSchemas.subtitle,
  description: contactSchemas.description,
  supportList: z.object({
    supports: z.array(
      z.object({
        icon: z.string(),
        title: contactSchemas.title,
        subtitle: contactSchemas.subtitle,
        link: contactSchemas.link,
      }),
    ),
  }),
}

/**
 * Contact 7 configuration
 */
export const contact7Fields: GroupField = {
  name: 'contact-7',
  interfaceName: 'Contact7Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Contact form',
  },
  fields: [
    createContactField({
      includeFields: ['title', 'description', 'subtitle'],
      groups: [
        {
          name: 'supportList',
          label: 'Support List',
          fields: ['supports'],
          arrays: [
            {
              name: 'supports',
              fields: [
                cardsFields.icon,
                cardsFields.title,
                cardsFields.subtitle,
                link({
                  name: 'link',
                  overrides: {
                    admin: {
                      description: 'Support card link',
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
                description: 'Support cards',
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
