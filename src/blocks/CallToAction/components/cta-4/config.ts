import type { Field } from 'payload'
import { buttonFields, createCTAField } from '../shared/base-field'

export const cta4Fields: Field = {
  name: 'cta-4',
  type: 'group',
  interfaceName: 'CTA4Fields',
  fields: [
    createCTAField({
      includeFields: ['title', 'description'],
      arrays: [
        {
          name: 'features',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              label: 'Feature Text',
            },
          ],
          minRows: 1,
          maxRows: 4,
          admin: {
            description: 'Feature list items (1-4)',
          },
        },
        {
          name: 'buttons',
          fields: Object.values(buttonFields),
          minRows: 1,
          maxRows: 1,
          admin: {
            description: 'CTA button',
          },
        },
      ],
    }),
  ],
}