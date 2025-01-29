import { GroupField } from 'payload'
import { z } from 'zod'
import { contactSchemas, createContactField, formFields, listFields } from '../shared/base-field'

/**
 * Contact 2 field validation and type definitions
 */
export const schemas = {
  title: contactSchemas.title,
  description: contactSchemas.description,
  list: contactSchemas.list,
  form: z.object({
    fields: z.array(contactSchemas.formField),
    submitButton: contactSchemas.submitButton,
  }),
}

/**
 * Contact 2 configuration
 */
export const contact2Fields: GroupField = {
  name: 'contact-2',
  interfaceName: 'Contact2Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Contact form with contact details',
  },
  fields: [
    createContactField({
      includeFields: ['title', 'description'],
      arrays: [
        {
          name: 'list',
          label: 'Contact Details',
          fields: [listFields.text],
          admin: {
            description: 'List',
          },
          minRows: 1,
          maxRows: 6,
        },
      ],
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
