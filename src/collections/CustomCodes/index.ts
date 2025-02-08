import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { superAdminOrTenantAdminAccess } from './access/superAdminOrTenantAdmin'
import { validateJavaScriptHook } from './hooks/validateJavaScript'

export const CustomCodes: CollectionConfig = {
  slug: 'custom-codes',
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
      name: 'headerScripts',
      type: 'code',
      admin: {
        description: 'Header scripts are added right before closing </head> tag',
        language: 'javascript',
      },
    },
    {
      name: 'bodyStartScripts',
      type: 'code',
      admin: {
        description: 'Body scripts are added right after opening <body> tag',
        language: 'javascript',
      },
    },
    {
      name: 'bodyEndScripts',
      type: 'code',
      admin: {
        description: 'Body scripts are added right before closing </body> tag',
        language: 'javascript',
      },
    },
  ],
}
