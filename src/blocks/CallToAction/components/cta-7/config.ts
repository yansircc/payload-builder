import { GroupField } from 'payload'
import { buttonFields, createCTAField } from '../shared/base-field'

export const cta7Fields: GroupField = {
  name: 'cta-7',
  interfaceName: 'CTA7Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'CTA with feature list and background pattern',
  },
  fields: [
    createCTAField({
      includeFields: ['title'],
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
            description: 'Call to action button',
          },
        },
      ],
    }),
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      admin: {
        description: 'Appears above the feature list',
      },
    },
  ],
}