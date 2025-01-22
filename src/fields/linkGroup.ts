import type { ArrayField } from 'payload'
import createLinkField from './link'

type LinkGroupOptions = {
  appearances?: ('default' | 'outline' | 'ghost')[]
  maxRows?: number
  types?: string[]
}

const baseLinkGroup = (options: LinkGroupOptions = {}): ArrayField => {
  const { appearances, maxRows, types } = options

  const result: ArrayField = {
    name: 'links',
    type: 'array',
    fields: [createLinkField({ appearances })],
    maxRows,
    admin: {
      initCollapsed: true,
      description: '链接组，用于展示一组按钮',
    },
  }

  if (types) {
    result.admin = {
      ...result.admin,
      condition: (_, { type } = {}) => types.includes(type),
    }
  }

  return result
}

export default function createLinkGroupField(options: LinkGroupOptions = {}): ArrayField {
  return baseLinkGroup(options)
}
