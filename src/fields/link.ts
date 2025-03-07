import type { Field, GroupField } from 'payload'
import deepMerge from '@/utilities/deepMerge'
import { icon } from './icon'

export type LinkAppearances = 'default' | 'secondary' | 'outline' | 'ghost' | 'link'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: { 
    label: 'Default',
    value: 'default'
  },
  secondary: { 
    label: 'Secondary',
    value: 'secondary'
  },
  outline: { 
    label: 'Outline', 
    value: 'outline' 
  },
  ghost: { 
    label: 'Ghost', 
    value: 'ghost' 
  },
  link: { 
    label: 'Link', 
    value: 'link' 
  },
}

type LinkUIEnhancements = {
  image?: boolean
  title?: boolean
  subtitle?: boolean
  description?: boolean
  icons?: boolean
}

type LinkType = (options?: {
  name?: string
  label?: string
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  ui?: LinkUIEnhancements
  overrides?: Partial<GroupField>
}) => Field

export const link: LinkType = ({
  name = 'link',
  label,
  appearances,
  disableLabel = false,
  ui = { 
    image: false, 
    title: false, 
    subtitle: false, 
    description: false, 
    icons: true 
  },
  overrides = {},
} = {}) => {
  const linkResult: GroupField = {
    name,
    label,
    type: 'group',
    admin: { hideGutter: true },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'select',
            admin: { width: '50%' },
            defaultValue: 'reference',
            options: [
              { label: 'Internal link', value: 'reference' },
              { label: 'Custom URL', value: 'custom' },
              { label: 'Popup', value: 'popup' },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              condition: (_, siblingData) => siblingData?.type !== 'popup',
              style: { alignSelf: 'flex-end' },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: { 
        condition: (_, siblingData) => siblingData?.type === 'reference' 
      },
      label: 'Document to link to',
      relationTo: ['pages', 'posts'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: { 
        condition: (_, siblingData) => siblingData?.type === 'custom' 
      },
      label: 'Custom URL',
      required: true,
    },
    {
      name: 'popup',
      type: 'relationship',
      relationTo: 'popups',
      admin: { condition: (_, siblingData) => siblingData?.type === 'popup' },
      label: 'Select Popup',
      required: true,
    },
  ]

  if (!disableLabel) {
    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        { 
          name: 'label', 
          type: 'text', 
          admin: { 
            width: '50%' 
          }, 
          label: 'Label', 
          required: true },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  const advancedFields: Field[] = []

  if (ui.icons) {
    advancedFields.push(
      icon({ name: 'prefixIcon', label: 'Prefix Icon' }),
      icon({ name: 'suffixIcon', label: 'Suffix Icon' }),
    )
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [
      appearanceOptions.default,
      appearanceOptions.secondary,
      appearanceOptions.outline,
      appearanceOptions.ghost,
      appearanceOptions.link,
    ]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    advancedFields.push({
      name: 'appearance',
      type: 'select',
      admin: { 
        description: 'Choose how the link should be rendered.', 
        width: '50%' 
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })
  }

  if (advancedFields.length > 0) {
    linkResult.fields.push({
      type: 'collapsible',
      label: 'Advanced',
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: advancedFields,
        },
      ],
    })
  }

  if (ui.image) {
    linkResult.fields.push({
      type: 'row',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Image URL for the link' },
        },
      ],
    })
  }

  if (ui.title) {
    linkResult.fields.push({
      type: 'row',
      fields: [{ 
        name: 'title', 
        type: 'text',
        admin: {
          description: 'Title for the link'
        } 
      }],
    })
  }

  if (ui.subtitle) {
    linkResult.fields.push({
      type: 'row',
      fields: [{ 
        name: 'subtitle', 
        type: 'text', 
        admin: { 
          description: 'Subtitle for the link' 
        }
      }],
    })
  }

  if (ui.description) {
    linkResult.fields.push({
      type: 'row',
      fields: [
        {
          name: 'description',
          type: 'textarea',
          admin: { 
            description: 'Description for the link' 
          },
        },
      ],
    })
  }

  return deepMerge(linkResult, overrides)
}
