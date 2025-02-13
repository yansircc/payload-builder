import { Block } from 'payload'
import { link } from '@/fields/link'

export const PopupTriggerBlock: Block = {
  slug: 'popupTrigger',
  interfaceName: 'PopupTriggerBlock',
  labels: {
    singular: 'Popup Trigger',
    plural: 'Popup Triggers',
  },
  fields: [
    {
      name: 'linkToPage',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      admin: {
        description: 'Select the page that will be linked to',
      },
    },
    {
      name: 'ctaButton',
      type: 'group',
      fields: [
        link({
          name: 'link',
          overrides: {
            admin: { description: 'CTA button to trigger link and popup' },
          },
        }),
      ],
      admin: {
        description: 'CTA button to trigger popup and link',
      },
    },
  ],
}
