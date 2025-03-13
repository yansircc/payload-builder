import { tenantsArrayField } from '@payloadcms/plugin-multi-tenant/fields'
import type { CollectionConfig } from 'payload'
import { isSuperAdmin } from '@/access/isSuperAdmin'
import { createAccess } from './access/create'
import { readAccess } from './access/read'
import { updateAndDeleteAccess } from './access/updateAndDelete'
import { externalUsersLogin } from './endpoints/externalUsersLogin'
import { ensureUniqueUsername } from './hooks/ensureUniqueUsername'
import { setCookieBasedOnDomain } from './hooks/setCookieBasedOnDomain'

const defaultTenantArrayField = tenantsArrayField({
  arrayFieldAccess: {},
  tenantFieldAccess: {},
  tenantsArrayFieldName: 'tenants',
  tenantsArrayTenantFieldName: 'tenant',
  tenantsCollectionSlug: 'tenants',
  rowFields: [
    {
      name: 'roles',
      type: 'select',
      defaultValue: ['tenant-viewer'],
      hasMany: true,
      options: ['tenant-admin', 'tenant-viewer'],
      required: true,
    },
  ],
})

const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: createAccess,
    delete: updateAndDeleteAccess,
    read: readAccess,
    update: updateAndDeleteAccess,
  },
  admin: {
    group: 'Configuration',
    useAsTitle: 'email',
  },
  auth: true,
  endpoints: [externalUsersLogin],
  fields: [
    {
      admin: {
        position: 'sidebar',
      },
      name: 'roles',
      type: 'select',
      defaultValue: ['user'],
      hasMany: true,
      options: ['super-admin', 'user'],
      access: {
        update: ({ req }) => {
          return isSuperAdmin(req.user)
        },
      },
    },
    {
      name: 'username',
      type: 'text',
      hooks: {
        beforeValidate: [ensureUniqueUsername],
      },
      index: true,
    },
    // Author Profile Fields
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Professional title or position',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Author bio or description',
      },
    },
    {
      name: 'socialLinks',
      type: 'group',
      admin: {
        description: 'Social media and contact information',
      },
      fields: [
        {
          name: 'facebook',
          type: 'text',
          admin: {
            description: 'Facebook profile URL',
          },
        },
        {
          name: 'linkedin',
          type: 'text',
          admin: {
            description: 'LinkedIn profile URL',
          },
        },
        {
          name: 'instagram',
          type: 'text',
          admin: {
            description: 'Instagram profile URL',
          },
        },
        {
          name: 'tiktok',
          type: 'text',
          admin: {
            description: 'TikTok profile URL',
          },
        },
        {
          name: 'twitter',
          type: 'text',
          admin: {
            description: 'Twitter/X profile URL',
          },
        },
        {
          name: 'github',
          type: 'text',
          admin: {
            description: 'GitHub profile URL',
          },
        },
        {
          name: 'whatsapp',
          type: 'text',
          admin: {
            description: 'WhatsApp contact URL (e.g., https://wa.me/1234567890)',
          },
        },
        {
          name: 'email',
          type: 'email',
          admin: {
            description: 'Public contact email (may differ from account email)',
          },
        },
        {
          name: 'website',
          type: 'text',
          admin: {
            description: 'Personal or professional website URL',
          },
        },
      ],
    },
    {
      ...defaultTenantArrayField,
      admin: {
        ...(defaultTenantArrayField?.admin || {}),
        position: 'sidebar',
      },
    },
  ],
  // The following hook sets a cookie based on the domain a user logs in from.
  // It checks the domain and matches it to a tenant in the system, then sets
  // a 'payload-tenant' cookie for that tenant.

  hooks: {
    afterLogin: [setCookieBasedOnDomain],
  },
}

export default Users
