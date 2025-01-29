import type { Block } from 'payload'
import { contact1Fields } from './components/Contact1/config'
import { contact2Fields } from './components/Contact2/config'
import { contact5Fields } from './components/Contact5/config'

/**
 * Contact Block configuration
 */
export const Contact: Block = {
  slug: 'contact',
  interfaceName: 'ContactBlock',
  labels: {
    singular: 'Contact',
    plural: 'Contacts',
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'contact-1',
      options: [
        {
          label: 'Contact 1',
          value: 'contact-1',
        },
        {
          label: 'Contact 2',
          value: 'contact-2',
        },
        {
          label: 'Contact 5',
          value: 'contact-5',
        },
      ],
    },
    {
      ...contact1Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'contact-1',
      },
    },
    {
      ...contact2Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'contact-2',
      },
    },
    {
      ...contact5Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'contact-5',
      },
    },
  ],
}
