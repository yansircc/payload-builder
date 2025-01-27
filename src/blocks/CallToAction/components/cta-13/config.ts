import { GroupField } from 'payload'
import { buttonFields, createCTAField } from '../shared/base-field'

export const cta13Fields: GroupField = {
  name: 'cta-13',
  interfaceName: 'CTA13Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'CTA with email subscription form',
  },
  fields: [
    createCTAField({
      includeFields: ['title', 'description'],
      arrays: [
        {
          name: 'button',
          fields: Object.values(buttonFields),
          minRows: 1,
          maxRows: 1,
          admin: {
            description: 'Subscribe button',
          },
        },
      ],
    }),
    {
      name: 'privacyPolicy',
      type: 'group',
      label: 'Privacy Policy Link',
      fields: Object.values(buttonFields),
    },
  ],
} 