import deepMerge from '@/utilities/deepMerge'
import type { Field, GroupField } from 'payload'

export type LinkAppearances = 'default' | 'outline' | 'ghost' | 'link'

export const appearanceOptions: Record<
  LinkAppearances,
  { label: string; value: string }
> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
  ghost: {
    label: 'Ghost',
    value: 'ghost',
  },
  link: {
    label: 'Link',
    value: 'link',
  },
}

export type LinkUIEnhancements = {
  image?: boolean
  title?: boolean
  subtitle?: boolean
  description?: boolean
  icons?: boolean
  popup?: boolean
}

export type LinkType = (options?: {
  name?: string
  label?: string
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  ui?: LinkUIEnhancements
  overrides?: Partial<GroupField>
}) => Field

export const link: LinkType = ({
  name = 'link',
  label = 'Link',
  appearances,
  disableLabel = false,
  ui = {
    image: false,
    title: false,
    subtitle: false,
    description: false,
    icons: true,
    popup: false,
  },
  overrides = {},
} = {}) => {
  const linkResult: GroupField = {
    name,
    label,
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        name: 'type',
        type: 'select',
        defaultValue: 'reference',
        options: [
          {
            label: 'Internal link',
            value: 'reference',
          },
          {
            label: 'Custom URL',
            value: 'custom',
          },
          {
            label: 'Popup',
            value: 'popup',
          },
        ],
      },
      {
        name: 'newTab',
        type: 'checkbox',
        admin: {
          style: {
            alignSelf: 'flex-end',
          },
          width: '50%',
        },
        label: 'Open in new tab',
      },
      {
        name: 'reference',
        type: 'relationship',
        relationTo: ['pages', 'posts'],
        required: true,
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'reference',
        },
      },
      {
        name: 'url',
        type: 'text',
        required: true,
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'custom',
        },
      },
      {
        name: 'popup',
        type: 'relationship',
        relationTo: 'popups',
        required: true,
        admin: {
          description: 'Choose a popup to display when this link is clicked',
          condition: (_, siblingData) => siblingData?.type === 'popup',
        },
      },
    ],
  }

  // Add appearance options if enabled
  if (appearances !== false) {
    let appearanceOptionsToUse = [
      appearanceOptions.default,
      appearanceOptions.outline,
      appearanceOptions.ghost,
      appearanceOptions.link,
    ]

    if (appearances) {
      appearanceOptionsToUse = appearances.map(
        (appearance) => appearanceOptions[appearance]
      )
    }

    linkResult.fields.push({
      type: 'row',
      fields: [
        {
          name: 'appearance',
          type: 'select',
          admin: {
            description: 'Choose how the link should be rendered.',
            width: '50%',
          },
          defaultValue: 'default',
          options: appearanceOptionsToUse,
        },
      ],
    })
  }

  // Add label field if not disabled
  if (!disableLabel) {
    linkResult.fields.push({
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        description: 'Text to display for the link',
      },
    })
  }

  // Add icons in the same row
  if (ui.icons) {
    linkResult.fields.push({
      type: 'row',
      fields: [
        {
          name: 'prefixIcon',
          type: 'text',
          admin: {
            description:
              'Optional: Lucide icon name for prefix (e.g., "ArrowLeft")',
            width: '50%',
          },
        },
        {
          name: 'suffixIcon',
          type: 'text',
          admin: {
            description:
              'Optional: Lucide icon name for suffix (e.g., "ArrowRight")',
            width: '50%',
          },
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
          admin: {
            description: 'Image URL for the link',
          },
        },
      ],
    })
  }

  if (ui.title) {
    linkResult.fields.push({
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'Title for the link',
          },
        },
      ],
    })
  }

  if (ui.subtitle) {
    linkResult.fields.push({
      type: 'row',
      fields: [
        {
          name: 'subtitle',
          type: 'text',
          admin: {
            description: 'Subtitle for the link',
          },
        },
      ],
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
            description: 'Description for the link',
          },
        },
      ],
    })
  }

  // Add popup fields if enabled
  if (ui.popup) {
    linkResult.fields.push({
      name: 'popup',
      type: 'relationship',
      relationTo: 'popups',
      admin: {
        description:
          'Optional: Select a popup to show when this link is clicked',
      },
    })
  }

  return deepMerge(linkResult, overrides)
}

export function isEmptyLink(link: any): boolean {
  if (!link) return true
  if (link.type === 'custom' && !link.url) return true
  if (link.type === 'reference' && !link.reference?.value?.slug) return true
  return false
}

export function getLinkHref(link: any): string {
  if (link.type === 'custom') return link.url || ''
  if (link.type === 'reference' && link.reference?.value?.slug) {
    return `/${link.reference.value.slug}`
  }
  return ''
}
