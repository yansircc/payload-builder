import { GlobalConfig } from 'payload'
import { footer1Fields } from './components/Footer1/config'
import { footer2Fields } from './components/Footer2/config'
import { revalidateFooter } from './hooks/revalidateFooter'

/**
 * Footer Block configuration
 */
export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'footer-1',
      options: [
        {
          label: 'Footer 1',
          value: 'footer-1',
        },
        {
          label: 'Footer 2',
          value: 'footer-2',
        },
      ],
    },
    {
      ...footer1Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'footer-1',
      },
    },
    {
      ...footer2Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'footer-2',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
