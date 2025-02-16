import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const ColumnsBlock: Block = {
  slug: 'columns',
  interfaceName: 'ColumnsBlock',
  labels: {
    singular: 'Columns',
    plural: 'Columns',
  },
  fields: [
    {
      name: 'layout',
      type: 'select',
      required: true,
      defaultValue: '50-50',
      options: [
        { label: '50% - 50%', value: '50-50' },
        { label: '33% - 67%', value: '33-67' },
        { label: '67% - 33%', value: '67-33' },
        { label: '25% - 75%', value: '25-75' },
        { label: '75% - 25%', value: '75-25' },
      ],
      admin: {
        description: 'Select the column layout. Columns will stack vertically on mobile screens.',
      },
    },
    {
      name: 'columns',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 2,
      labels: {
        singular: 'Column',
        plural: 'Columns',
      },
      fields: [
        {
          name: 'content',
          type: 'blocks',
          required: true,
          blocks: [
            {
              slug: 'text',
              labels: { singular: 'Text', plural: 'Texts' },
              fields: [
                {
                  name: 'content',
                  type: 'richText',
                  required: true,
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => [...rootFeatures],
                  }),
                },
              ],
            },
            {
              slug: 'image',
              labels: { singular: 'Image', plural: 'Images' },
              fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
            },
            {
              slug: 'video',
              labels: { singular: 'Video', plural: 'Videos' },
              fields: [{ name: 'url', type: 'text' }],
            },
          ],
        },
      ],
    },
  ],
}
