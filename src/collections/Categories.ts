import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Taxonomies',
    useAsTitle: 'title',
    defaultColumns: ['title', 'type'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: ['post', 'product', 'service'],
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
}
