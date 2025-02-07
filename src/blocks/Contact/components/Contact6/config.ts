import { GroupField } from 'payload'
import { z } from 'zod'
import { link } from '@/fields/link'
import { cardsFields, contactSchemas, createContactField, formFields } from '../shared/base-field'

/**
 * Contact 6 field validation and type definitions
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
  form: z.object({
    fields: z.array(contactSchemas.formField),
    submitButton: contactSchemas.submitButton,
  }),
}

/**
 * Contact 6 configuration
 */
export const contact6Fields: GroupField = {
  name: 'contact-6',
  interfaceName: 'Contact6Fields',
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
        {
          name: 'form',
          label: 'Contact Form',
          fields: ['submitButton'],
          arrays: [
            {
              name: 'fields',
              fields: Object.values(formFields),
              minRows: 1,
              admin: {
                description: 'Fields',
              },
            },
          ],
          admin: {
            description: 'Contact form',
          },
        },
      ],
    }),
  ],
}
