import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { superAdminOrTenantAdminAccess } from './access/superAdminOrTenantAdmin'
import { validateJavaScriptHook } from './hooks/validateJavaScript'

const SCRIPT_POSITIONS = {
  HEAD: 'head',
  BODY_START: 'body-start',
  BODY_END: 'body-end',
} as const

const LOADING_STRATEGIES = {
  SYNC: 'sync',
  ASYNC: 'async',
  DEFER: 'defer',
} as const

export const CustomCodes: CollectionConfig = {
  slug: 'custom-codes',
  admin: {
    group: 'Settings',
    description: 'Manage custom JavaScript code snippets for your site',
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
      name: 'scripts',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Add one or more scripts',
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
          name: 'isEnabled',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Enable or disable this script',
          },
        },
        {
          name: 'code',
          type: 'code',
          required: true,
          admin: {
            language: 'html',
            description: 'Enter script code (can include script tags)',
          },
        },
        {
          type: 'collapsible',
          label: 'Advanced Settings',
          admin: {
            description: 'Configure script loading behavior and scope',
            initCollapsed: true,
          },
          fields: [
            {
              name: 'position',
              type: 'select',
              defaultValue: SCRIPT_POSITIONS.HEAD,
              options: [
                { label: 'Head (before </head>)', value: SCRIPT_POSITIONS.HEAD },
                { label: 'Body Start (after <body>)', value: SCRIPT_POSITIONS.BODY_START },
                { label: 'Body End (before </body>)', value: SCRIPT_POSITIONS.BODY_END },
              ],
              admin: {
                description: 'Where to place the script in the document',
              },
            },
            {
              name: 'loadingStrategy',
              type: 'select',
              defaultValue: LOADING_STRATEGIES.SYNC,
              options: [
                { label: 'Synchronous', value: LOADING_STRATEGIES.SYNC },
                { label: 'Asynchronous', value: LOADING_STRATEGIES.ASYNC },
                { label: 'Deferred', value: LOADING_STRATEGIES.DEFER },
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
