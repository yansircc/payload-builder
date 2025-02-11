import type { CollectionConfig } from 'payload'
import { superAdminOrTenantAdminAccess } from '@/collections/Pages/access/superAdminOrTenantAdmin'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { AboutBlock } from '../../blocks/About/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'

export const Popups: CollectionConfig = {
  slug: 'popups',
  access: {
    create: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
    read: authenticatedOrPublished,
    update: superAdminOrTenantAdminAccess,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
    description: 'Create and manage popups that can be triggered from any link field.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Name your popup for easy reference',
      },
    },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'default',
      options: [
        {
          label: 'Small',
          value: 'sm',
        },
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Large',
          value: 'lg',
        },
        {
          label: 'Full Screen',
          value: 'full',
        },
      ],
      admin: {
        description: 'Choose the size of the popup',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [AboutBlock, Content, FormBlock, MediaBlock],
      required: true,
      admin: {
        description: 'Add content blocks to your popup',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
}
