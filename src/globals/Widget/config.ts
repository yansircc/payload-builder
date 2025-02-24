import type { CollectionConfig } from 'payload'
import { superAdminOrTenantAdminAccess } from './access/superAdminOrTenantAdmin'

export const Widgets: CollectionConfig = {
  slug: 'widgets',
  admin: {
    defaultColumns: ['name', 'widgetType', 'updatedAt'],
    group: 'Template',
  },
  access: {
    read: () => true,
    create: superAdminOrTenantAdminAccess,
    update: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
  },
  fields: [
    {
      name: 'widgetType',
      type: 'select',
      required: true,
      options: [
        {
          label: 'WhatsApp',
          value: 'whatsapp',
        },
      ],
    },
    {
      name: 'whatsapp',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData.widgetType === 'whatsapp',
      },
      fields: [
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'The avatar of the WhatsApp widget',
          },
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Name',
          admin: {
            description: 'The name of the WhatsApp widget',
          },
        },
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Message Text',
          admin: {
            description: 'The default message that will be pre-filled in WhatsApp',
          },
        },
        {
          name: 'phoneNumber',
          type: 'text',
          required: true,
          label: 'Phone Number',
          admin: {
            description: 'Enter phone number with country code (e.g., +1234567890)',
          },
          validate: (value?: string | string[] | null) => {
            if (!value || Array.isArray(value)) return true
            const phoneRegex = /^\+[1-9]\d{1,14}$/
            if (!phoneRegex.test(value)) {
              return 'Please enter a valid phone number with country code (e.g., +1234567890)'
            }
            return true
          },
        },
        {
          name: 'isActive',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Control whether this widget is active or not',
          },
        },
      ],
    },
  ],
  timestamps: true,
}

export default Widgets
