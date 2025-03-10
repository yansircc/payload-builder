import type { CollectionConfig } from 'payload'
import { isSuperAdminAccess } from '@/access/isSuperAdmin'
import { updateAndDeleteAccess } from './access/updateAndDelete'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  access: {
    create: isSuperAdminAccess,
    delete: updateAndDeleteAccess,
    read: () => true,
    update: updateAndDeleteAccess,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Configuration',
    description: 'Manage tenant configurations and settings',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'domain',
      type: 'text',
      unique: true,
      admin: { description: 'The domain name for this tenant (e.g., example.com)' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'A unique identifier for this tenant' },
    },
    {
      name: 'allowPublicRead',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Allow public access to content', position: 'sidebar' },
    },
  ],
}
