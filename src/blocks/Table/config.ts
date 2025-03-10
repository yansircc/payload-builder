import type { Block } from 'payload'

export const Table: Block = {
  slug: 'table',
  interfaceName: 'TableBlock',
  labels: {
    singular: 'Table',
    plural: 'Tables',
  },
  fields: [
    {
      name: 'content',
      type: 'code',
      required: true,
      admin: {
        language: 'html',
        description: 'Paste the AI-generated table HTML here. Ensure it is valid table markup.',
      },
      validate: (value) => {
        if (!value || typeof value !== 'string') {
          return 'Content must be a valid string.'
        }
        if (!value.includes('<table') || !value.includes('</table>')) {
          return 'The content must contain a valid <table> element.'
        }
        return true
      },
    },

    {
      name: 'caption',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional: Add a caption for the table.',
      },
    },
  ],
}
