import type { Field } from 'payload';
import { buttonFields, createCTAField } from '../shared/base-field';

export const cta5Fields: Field = createCTAField({
  includeFields: ['title', 'description'],
  arrays: [
    {
      name: 'images',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      minRows: 1,
      maxRows: 3,
      admin: {
        description: 'Add up to 3 floating image cards',
      },
    },
    {
      name: 'buttons',
      fields: Object.values(buttonFields),
      minRows: 0,
      maxRows: 1,
    },
  ],
}); 