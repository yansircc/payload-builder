import type { CollectionConfig } from 'payload'

export const ErrorLogs: CollectionConfig = {
  slug: 'error-logs',
  admin: {
    useAsTitle: 'url',
    group: 'System',
    defaultColumns: ['url', 'errorType', 'createdAt', 'userAgent'],
  },
  access: {
    read: () => true,
    create: () => false,
    update: () => false, // Error logs should be immutable
    delete: () => false, // Error logs should be immutable
  },
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        description: 'The URL that caused the error',
      },
    },
    {
      name: 'errorType',
      type: 'select',
      required: true,
      defaultValue: '404',
      options: [
        {
          label: '404 Not Found',
          value: '404',
        },
        {
          label: '500 Server Error',
          value: '500',
        },
      ],
    },
    {
      name: 'userAgent',
      type: 'text',
      admin: {
        description: 'Browser/client information',
      },
    },
    {
      name: 'referrer',
      type: 'text',
      admin: {
        description: 'The page that linked to this URL',
      },
    },
    // {
    //   name: 'tenant',
    //   type: 'relationship',
    //   relationTo: 'tenants',
    //   admin: {
    //     position: 'sidebar',
    //   },
    // },
  ],
  timestamps: true, // Adds createdAt and updatedAt
}
