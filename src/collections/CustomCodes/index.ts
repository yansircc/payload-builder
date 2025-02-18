import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { superAdminOrTenantAdminAccess } from './access/superAdminOrTenantAdmin'
import { validateJavaScriptHook } from './hooks/validateJavaScript'

export const SCRIPT_TYPES = {
  GOOGLE_ANALYTICS: 'google-analytics',
  GOOGLE_TAG_MANAGER: 'google-tag-manager',
  CUSTOM: 'custom',
} as const

export const CustomCodes: CollectionConfig = {
  slug: 'custom-codes',
  labels: {
    singular: 'Custom Code',
    plural: 'Custom Codes',
  },
  admin: {
    group: 'Configuration',
    description: 'Manage custom JavaScript code snippets for your site',
    useAsTitle: 'hiddenLabel',
  },
  access: {
    create: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
    read: authenticated,
    update: superAdminOrTenantAdminAccess,
  },
  hooks: {
    beforeChange: [validateJavaScriptHook],
  },
  fields: [
    {
      name: 'hiddenLabel',
      type: 'text',
      defaultValue: 'Custom Code',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'scripts',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Add one or more scripts',
        initCollapsed: true,
        components: {
          RowLabel: '/collections/CustomCodes/components/ScriptRowLabel',
        },
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          defaultValue: 'Untitled Script',
          admin: {
            description: 'A descriptive name for this script',
          },
        },
        {
          name: 'type',
          type: 'select',
          defaultValue: SCRIPT_TYPES.CUSTOM,
          options: [
            { label: 'Google Analytics', value: SCRIPT_TYPES.GOOGLE_ANALYTICS },
            { label: 'Google Tag Manager', value: SCRIPT_TYPES.GOOGLE_TAG_MANAGER },
            { label: 'Custom Script', value: SCRIPT_TYPES.CUSTOM },
          ],
          admin: {
            description: 'Select script type for optimized loading',
          },
        },
        {
          name: 'trackingId',
          type: 'text',
          admin: {
            description: 'Enter tracking ID (e.g., G-XXXXXXX for GA4, GTM-XXXXXX for GTM)',
            condition: (data, siblingData) =>
              siblingData.type === SCRIPT_TYPES.GOOGLE_ANALYTICS ||
              siblingData.type === SCRIPT_TYPES.GOOGLE_TAG_MANAGER,
          },
        },
        {
          name: 'code',
          type: 'code',
          required: true,
          admin: {
            language: 'html',
            description: 'Enter script code',
            condition: (data, siblingData) => siblingData.type === SCRIPT_TYPES.CUSTOM,
          },
        },
        {
          name: 'isEnabled',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Enable or disable this script',
          },
        },
        {
          type: 'collapsible',
          label: 'Advanced Settings',
          admin: {
            description: 'Configure script loading behavior and scope',
            initCollapsed: true,
            condition: (data, siblingData) => siblingData.type === SCRIPT_TYPES.CUSTOM,
          },
          fields: [
            {
              name: 'position',
              type: 'select',
              defaultValue: 'head',
              options: [
                { label: 'Head (before </head>)', value: 'head' },
                { label: 'Body Start (after <body>)', value: 'body-start' },
                { label: 'Body End (before </body>)', value: 'body-end' },
              ],
              admin: {
                description: 'Where to place the script in the document',
              },
            },
            {
              name: 'loadingStrategy',
              type: 'select',
              defaultValue: 'sync',
              options: [
                { label: 'Synchronous', value: 'sync' },
                { label: 'Asynchronous', value: 'async' },
                { label: 'Deferred', value: 'defer' },
              ],
              admin: {
                description: 'How the script should be loaded',
              },
            },
            {
              name: 'urlPattern',
              type: 'text',
              admin: {
                description:
                  'Optional: URL pattern where this script should load (e.g., "/blog/*" or "/about"). Leave empty for all pages.',
              },
            },
          ],
        },
      ],
    },
  ],
}
