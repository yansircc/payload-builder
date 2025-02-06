import { GroupField } from 'payload'
import { z } from 'zod'

import {
  contactSchemas,
  createContactField,
  formFields,
} from '../shared/base-field'

/**
 * Contact 5 field validation and type definitions
 */
export const schemas = {
  title: contactSchemas.title,
  subtitle: contactSchemas.subtitle,
  description: contactSchemas.description,
  form: z.object({
    fields: z.array(contactSchemas.formField),
    submitButton: contactSchemas.submitButton,
  }),
}

/**
 * Contact 5 configuration
 */
export const contact5Fields: GroupField = {
  name: 'contact-5',
  interfaceName: 'Contact5Fields',
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
