import { GroupField } from 'payload'
import { buttonFields, createCTAField } from '../shared/base-field'

/**
 * CTA 11 field configuration
 */
export const cta11Fields: GroupField = {
  name: 'cta-11',
  interfaceName: 'CTA11Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'CTA with centered layout',
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