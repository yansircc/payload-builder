import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { superAdminOrTenantAdminAccess } from './access/superAdminOrTenantAdmin'

export const CustomCodes: CollectionConfig = {
  slug: 'custom-codes',
  access: {
    create: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
    read: authenticated,
    update: superAdminOrTenantAdminAccess,
  },
  fields: [
    {
      name: 'headerScripts',
      type: 'textarea',
      admin: {
        description: 'Header scripts are added right before closing </head> tag',
        rows: 20,
      },
    },
    {
      name: 'bodyStartScripts',
      type: 'textarea',
      admin: {
        description: 'Body scripts are added right after opening <body> tag',
        rows: 20,
      },
    },
    {
      name: 'bodyEndScripts',
      type: 'textarea',
      admin: {
        description: 'Body scripts are added right before closing </body> tag',
        rows: 20,
      },
    },
  ],
}
