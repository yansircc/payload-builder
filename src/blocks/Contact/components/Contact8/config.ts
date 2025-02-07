import { GroupField } from 'payload'
import { z } from 'zod'
import { link } from '@/fields/link'
import { cardsFields, contactSchemas, createContactField } from '../shared/base-field'

/**
 * Contact 8 field validation and type definitions
 */
export const schemas = {
  title: contactSchemas.title,
  subtitle: contactSchemas.subtitle,
  description: contactSchemas.description,
  supportList: z.object({
    title: contactSchemas.title,
    supports: z.array(contactSchemas.link),
  }),
  officeList: z.object({
    title: contactSchemas.title,
    offices: z.array(
      z.object({
        title: contactSchemas.title,
        subtitle: contactSchemas.subtitle,
      }),
    ),
  }),
}

/**
 * Contact 8 configuration
 */
export const contact8Fields: GroupField = {
  name: 'contact-8',
  interfaceName: 'Contact8Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Contact form',
  },
  fields: [
    createContactField({
      includeFields: ['title', 'subtitle', 'image'],
      groups: [
        {
          name: 'supportList',
          label: 'Support List',
          fields: ['title'],
          arrays: [
            {
              name: 'supports',
              fields: [
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
              maxRows: 2,
              admin: {
                description: 'Support cards',
              },
            },
          ],
          admin: {
            description: 'Support list',
          },
        },
        {
          name: 'officeList',
          label: 'Offices list',
          fields: ['title'],
          arrays: [
            {
              name: 'offices',
              fields: [cardsFields.title, cardsFields.subtitle],
              minRows: 1,
              maxRows: 2,
              admin: {
                description: 'Office cards',
              },
            },
          ],
          admin: {
            description: 'Office list',
          },
        },
      ],
    }),
  ],
}
