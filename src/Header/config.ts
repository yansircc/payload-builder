import { GlobalConfig } from 'payload'
import { header1Fields } from './components/Header1/config'
// import { header2Fields } from './components/Header2/config'
// import { header4Fields } from './components/Header4/config'
import { header5Fields } from './components/Header5/config'
import { revalidateHeader } from './hooks/revalidateHeader'

/**
 * Header Block configuration
 */
export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'header-1',
      options: [
        {
          label: 'Header 1',
          value: 'header-1',
        },
        // {
        //   label: 'Header 2',
        //   value: 'header-2',
        // },
        // {
        //   label: 'Header 4',
        //   value: 'header-4',
        // },
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
    // {
    //   ...header2Fields,
    //   admin: {
    //     condition: (_, siblingData) => siblingData.style === 'header-2',
    //   },
    // },
    // {
    //   ...header4Fields,
    //   admin: {
    //     condition: (_, siblingData) => siblingData.style === 'header-4',
    //   },
    // },
    {
      ...header5Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'header-5',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
