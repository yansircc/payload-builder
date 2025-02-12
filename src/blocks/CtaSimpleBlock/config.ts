import type { Block } from 'payload'

export const CtaSimpleBlock: Block = {
  slug: 'ctaSimple',
  interfaceName: 'CtaSimpleBlock',
  labels: {
    singular: 'Cta Section',
    plural: 'Cta Sections',
  },
  fields: [
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Color',
      required: true,
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Accent', value: 'accent' },
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ],
      admin: {
        description: 'Select the background color for the CTA.',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'CTA Heading',
      required: true,
      admin: {
        placeholder: 'Enter CTA heading...',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: false,
      admin: {
        placeholder: 'Add a short description...',
      },
    },
    {
      name: 'buttonLabel',
      type: 'text',
      label: 'Button Text',
      required: true,
      admin: {
        placeholder: 'Enter button text...',
      },
    },
    {
      name: 'buttonUrl',
      type: 'text',
      label: 'Button URL',
      required: true,
      admin: {
        placeholder: 'Enter target URL...',
      },
    },
    {
      name: 'buttonStyle',
      type: 'select',
      label: 'Button Style',
      required: true,
      options: [
        { label: 'Solid', value: 'solid' },
        { label: 'Outline', value: 'outline' },
        { label: 'Ghost', value: 'ghost' },
      ],
    },
  ],
}
