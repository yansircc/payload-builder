import { CollectionConfig } from 'payload'
import { header1Fields } from './components/Header1/config'
import { header3Fields } from './components/Header3/config'
// import { header4Fields } from './components/Header4/config'
import { header5Fields } from './components/Header5/config'

/**
 * Header Block configuration
 */
export const Header: CollectionConfig = {
  slug: 'header',
  labels: {
    singular: 'Header',
    plural: 'Headers',
  },
  access: {
    read: () => true,
  },
  admin: {
    group: 'Template',
    useAsTitle: 'hiddenLabel',
    description: 'Manage the header for your site',
  },
  fields: [
    {
      name: 'hiddenLabel',
      type: 'text',
      defaultValue: 'Header',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'header-1',
      options: [
        {
          label: 'Header 1',
          value: 'header-1',
        },
        {
          label: 'Header 3',
          value: 'header-3',
        },
        {
          label: 'Header 5',
          value: 'header-5',
        },
      ],
    },
    {
      ...header1Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'header-1',
      },
    },
    {
      ...header3Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'header-3',
      },
    },
    {
      ...header5Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'header-5',
      },
    },
  ],
}
