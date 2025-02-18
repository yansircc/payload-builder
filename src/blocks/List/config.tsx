import { Block } from 'payload'

export const ListBlock: Block = {
  slug: 'list',
  interfaceName: 'ListBlock',
  labels: {
    singular: 'List',
    plural: 'Lists',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Ordered List (ol)', value: 'ordered' },
        { label: 'Unordered List (ul)', value: 'unordered' },
      ],
      admin: {
        description: 'Select the list type.',
      },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
