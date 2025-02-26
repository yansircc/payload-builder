import type { Block } from 'payload'

export const HTML: Block = {
  slug: 'html',
  interfaceName: 'HTMLBlock',
  labels: {
    singular: 'HTML',
    plural: 'HTML',
  },
  fields: [
    {
      name: 'content',
      type: 'code',
      required: true,
      admin: {
        language: 'html',
        description: 'Paste HTML.',
      },
    },
  ],
}
