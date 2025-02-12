import type { Block } from 'payload'

export const PopupTriggerBlock: Block = {
  slug: 'popupTrigger',
  interfaceName: 'PopupTriggerBlock',
  labels: {
    singular: 'Popup Trigger',
    plural: 'Popup Triggers',
  },
  fields: [
    {
      name: 'triggerText',
      type: 'text',
      label: 'Label Trigger',
      required: true,
    },
    {
      name: 'triggerType',
      type: 'select',
      options: ['button', 'link', 'image'],
      defaultValue: 'button',
    },
    {
      name: 'popupClass',
      type: 'text',
      defaultValue: 'inquiry-pop-trigger',
      admin: {
        description: 'Class CSS untuk target popup',
      },
    },
    {
      name: 'triggerAction',
      type: 'select',
      options: [
        { label: 'Klik', value: 'click' },
        { label: 'Hover', value: 'hover' },
        { label: 'Focus', value: 'focus' },
      ],
      defaultValue: 'click',
    },
    {
      name: 'customAttributes',
      type: 'json',
      admin: {
        description: 'Contoh: { "href": "#", "data-custom": "value" }',
      },
    },
  ],
}
