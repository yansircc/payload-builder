import type { Block } from 'payload'

export const LinkBlock: Block = {
  slug: 'link',
  interfaceName: 'LinkBlock',
  labels: {
    singular: 'Link',
    plural: 'Links',
  },
  fields: [
    {
      name: 'text',
      type: 'text',
      required: false,
      admin: {
        placeholder: 'Enter link text (optional if using an image or button)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Optional: Upload an image to use as a link.',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Enter URL',
      },
    },
    {
      name: 'newTab',
      type: 'checkbox',
      label: 'Open in a new tab (_blank)',
    },
    {
      name: 'nofollow',
      type: 'checkbox',
      label: 'Add rel="nofollow" attribute',
    },
    {
      name: 'buttonStyle',
      type: 'select',
      label: 'Button Style (Optional)',
      required: false,
      options: [
        { label: 'Solid', value: 'solid' },
        { label: 'Outline', value: 'outline' },
        { label: 'Ghost', value: 'ghost' },
      ],
      admin: {
        description: 'Select a button style if this is a button link.',
      },
    },
  ],
}
