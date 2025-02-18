import { Block } from 'payload'
import { link } from '@/fields/link'

export const LinkPopupBlock: Block = {
  slug: 'linkPopup',
  interfaceName: 'LinkPopupBlock',
  labels: {
    singular: 'Link/Popup',
    plural: 'Link/Popup',
  },
  fields: [
    link({
      name: 'link',
      overrides: {
        admin: { description: 'Link or Popup' },
      },
    }),
  ],
}
