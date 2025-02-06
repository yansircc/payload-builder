import { GroupField } from 'payload'
import { z } from 'zod'

import {
  contactSchemas,
  createContactField,
  formFields,
  listFields,
  mediaFields,
} from '../shared/base-field'

/**
 * Contact 1 field validation and type definitions
 */
export const schemas = {
  title: contactSchemas.title,
  subtitle: contactSchemas.subtitle,
  avatars: z.array(contactSchemas.image),
  list: contactSchemas.list,
  form: z.object({
    fields: z.array(contactSchemas.formField),
    submitButton: contactSchemas.submitButton,
  }),
  logos: z.array(contactSchemas.image),
}

/**
 * Contact 1 configuration
 */
export const contact1Fields: GroupField = {
  name: 'contact-1',
  interfaceName: 'Contact1Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Contact form with avatars, list items, and brand images',
  },
  fields: [
    createContactField({
      includeFields: ['title', 'description'],
      arrays: [
        {
          label: 'What you can expect:',
          name: 'list',
          fields: Object.values(listFields),
          admin: {
            description: 'List with icons',
          },
          minRows: 1,
          maxRows: 6,
        },
        {
          name: 'avatars',
          label: 'Avatars widget',
          fields: [mediaFields.image],
          admin: {
            description: 'Avatar fields',
          },
          minRows: 3,
          maxRows: 3,
        },
        {
          name: 'logos',
          label: 'Brand logos',
          fields: [mediaFields.image],
          admin: {
            description: 'Logo fields',
          },
          minRows: 1,
          maxRows: 2,
        },
      ],
      groups: [
        {
          label: 'Contact Form',
          name: 'form',
          fields: ['submitButton'],
          arrays: [
            {
              name: 'fields',
              label: 'Contact Form Fields',
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
