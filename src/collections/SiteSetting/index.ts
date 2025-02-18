import type { CollectionConfig } from 'payload'
import { superAdminOrTenantAdminAccess } from './access/superAdminOrTenantAdmin'

const archiveStyleOptions = [
  { label: 'Grid', value: 'grid' },
  { label: 'List', value: 'list' },
  { label: 'Card', value: 'card' },
]

export const SiteSettings: CollectionConfig = {
  slug: 'site-settings',
  labels: {
    singular: 'Site Settings',
    plural: 'Site Settings',
  },
  admin: {
    group: 'Configuration',
    useAsTitle: 'hiddenLabel',
  },
  access: {
    read: () => true,
    create: superAdminOrTenantAdminAccess,
    update: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
  },
  versions: { drafts: true },
  fields: [
    {
      name: 'hiddenLabel',
      type: 'text',
      defaultValue: 'Site Settings',
      admin: {
        hidden: true,
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              maxLength: 60,
              admin: { description: 'SEO title for homepage (recommended: 50-60 characters)' },
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
              admin: { description: 'Upload your site favicon (recommended size: 32x32 or 16x16)' },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: false,
              admin: { description: 'Upload your site logo' },
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
        },
        {
          label: 'Theme',
          fields: [
            {
              name: 'archiveStyles',
              type: 'group',
              label: 'Archive Page Styles',
              fields: [
                {
                  name: 'posts',
                  type: 'select',
                  label: 'Posts Archive Style',
                  defaultValue: 'grid',
                  options: archiveStyleOptions,
                  admin: {
                    description: 'Select the layout style for the posts archive page',
                  },
                },
                {
                  name: 'services',
                  type: 'select',
                  label: 'Services Archive Style',
                  defaultValue: 'grid',
                  options: archiveStyleOptions,
                  admin: {
                    description: 'Select the layout style for the services archive page',
                  },
                },
                {
                  name: 'products',
                  type: 'select',
                  label: 'Products Archive Style',
                  defaultValue: 'grid',
                  options: archiveStyleOptions,
                  admin: {
                    description: 'Select the layout style for the products archive page',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'AI',
          fields: [
            {
              name: 'ai',
              label: 'AI',
              type: 'group',
              fields: [
                {
                  name: 'openai',
                  type: 'text',
                  admin: {
                    description: 'OpenAI API Key',
                    placeholder: 'sk-xxxxxxxxxxxxxxxx',
                    style: {
                      fontFamily: 'monospace',
                    },
                  },
                },
                {
                  name: 'deepseek',
                  type: 'text',
                  admin: {
                    description: 'DeepSeek API Key',
                    placeholder: 'sk-xxxxxxxxxxxxxxxx',
                    style: {
                      fontFamily: 'monospace',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default SiteSettings
