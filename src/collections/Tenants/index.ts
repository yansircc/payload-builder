import type { CollectionConfig } from 'payload'
import { isSuperAdminAccess } from '@/access/isSuperAdmin'
import { themes } from '@/themes'
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
    group: 'Settings',
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
      name: 'theme',
      type: 'select',
      required: true,
      defaultValue: 'modern',
      options: Object.entries(themes).map(([value, theme]) => ({ label: theme.label, value })),
      admin: { description: 'Select the design theme for this tenant', position: 'sidebar' },
    },
    {
      name: 'allowPublicRead',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Allow public access to content', position: 'sidebar' },
    },
  ],
}
