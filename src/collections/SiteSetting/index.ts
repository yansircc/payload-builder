import type { CollectionConfig } from 'payload'
import { superAdminOrTenantAdminAccess } from './access/superAdminOrTenantAdmin'

export const SiteSettings: CollectionConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: superAdminOrTenantAdminAccess,
    update: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 60,
      admin: {
        description: 'SEO title for homepage (recommended: 50-60 characters)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      maxLength: 160,
      admin: {
        description: 'SEO description for homepage (recommended: 150-160 characters)',
      },
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Upload your site favicon (recommended size: 32x32 or 16x16)',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Upload your site logo',
      },
    },
    {
      name: 'defaultLanguage',
      type: 'select',
      required: true,
      defaultValue: 'en',
      options: [
        {
          label: 'English',
          value: 'en',
        },
        {
          label: 'Chinese',
          value: 'zh',
        },
        // Add more languages as needed
      ],
    },
    {
      name: 'searchEngineVisibility',
      type: 'group',
      fields: [
        {
          name: 'allowIndexing',
          type: 'checkbox',
          defaultValue: true,
          label: 'Allow search engines to index this site',
        },
        {
          name: 'robotsTxtContent',
          type: 'textarea',
          admin: {
            description: 'Custom robots.txt content (optional)',
            condition: (data, siblingData) => !siblingData.allowIndexing,
          },
        },
      ],
    },
  ],
}

export default SiteSettings
