import { GroupField } from 'payload'
import { buttonFields, createCTAField } from '../shared/base-field'

/**
 * CTA 10 field configuration
 */
export const cta10Fields: GroupField = {
  name: 'cta-10',
  interfaceName: 'CTA10Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'CTA with title, description and buttons',
  },
  fields: [
    createCTAField({
      includeFields: ['title', 'description'],
      arrays: [
        {
          name: 'buttons',
          fields: Object.values(buttonFields),
          minRows: 1,
          maxRows: 2,
          admin: {
            description: 'CTA buttons (1-2)',
          },
        },
      ],
    }),
  ],
}