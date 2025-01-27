import type { Field } from 'payload';
import { buttonFields } from '../shared/base-field';

export const cta5Fields: Field = {
  name: 'cta',
  interfaceName: 'CTA5Fields',
  label: 'Call to Action',
  type: 'group',
  admin: {
    description: 'A call to action section with floating image cards',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Floating Cards',
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Button',
      minRows: 1,
      maxRows: 1,
      fields: Object.values(buttonFields),
    },
  ],
}; 