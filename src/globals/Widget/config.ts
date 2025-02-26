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
        {
          label: 'Consent Banner',
          value: 'consentBanner',
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
    {
      name: 'consentBanner',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData.widgetType === 'consentBanner',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Banner Title',
          admin: {
            description: 'The title of the consent banner',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Banner Description',
          admin: {
            description: 'The main text content of the consent banner',
          },
        },
        {
          name: 'acceptButtonText',
          type: 'text',
          required: true,
          label: 'Accept Button Text',
          defaultValue: 'Accept',
          admin: {
            description: 'Text to display on the accept button',
          },
        },
        {
          name: 'rejectButtonText',
          type: 'text',
          required: true,
          label: 'Reject Button Text',
          defaultValue: 'Reject',
          admin: {
            description: 'Text to display on the reject button',
          },
        },
        {
          name: 'privacyPolicyLink',
          type: 'text',
          label: 'Privacy Policy Link',
          admin: {
            description: 'Link to your privacy policy (optional)',
          },
        },
        {
          name: 'isActive',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Control whether this consent banner is active or not',
          },
        },
      ],
    },
  ],
  timestamps: true,
}

export default Widgets
