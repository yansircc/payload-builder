import type { Block } from 'payload'

export const PopupTriggerBlock: Block = {
  slug: 'popup-trigger',
  labels: {
    singular: 'Popup Trigger',
    plural: 'Popup Triggers',
  },
  fields: [
    {
      name: 'triggerText',
      type: 'text',
      label: 'Trigger Text',
      required: true,
      admin: {
        placeholder: 'Enter trigger text...',
      },
    },
    {
      name: 'triggerType',
      type: 'select',
      label: 'Trigger Type',
      required: true,
      defaultValue: 'button',
      options: [
        { label: 'Button', value: 'button' },
        { label: 'Link', value: 'link' },
        { label: 'Image', value: 'image' },
      ],
      admin: {
        description: 'Select how the popup will be triggered.',
      },
    },
    {
      name: 'popupClass',
      type: 'text',
      label: 'Popup Class',
      required: true,
      defaultValue: 'inquiry-pop-trigger',
      admin: {
        description:
          'This class will be used to trigger the popup. Example: "inquiry-pop-trigger".',
      },
    },
    {
      name: 'triggerAction',
      type: 'select',
      label: 'Trigger Action',
      required: true,
      defaultValue: 'click',
      options: [
        { label: 'Click', value: 'click' },
        { label: 'Hover', value: 'hover' },
        { label: 'Focus', value: 'focus' },
      ],
      admin: {
        description: 'Select how the popup is triggered.',
      },
    },
    {
      name: 'customAttributes',
      type: 'code',
      label: 'Custom Attributes (JSON)',
      required: false,
      admin: {
        language: 'json',
        description:
          'Optional: Add custom HTML attributes for the trigger. Example: `{ "data-popup-id": "123" }`',
      },
    },
  ],
}
