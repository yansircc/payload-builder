import type { TextField } from 'payload'

const baseBadge: TextField = {
  name: 'badge',
  label: '标签栏',
  type: 'text',
  maxLength: 15,
  defaultValue: 'New Release',
  admin: {
    description: '通常用于显示在标题上方的徽章文本，1~3个单词',
  },
}

export default function createBadgeField(types?: string[]): TextField {
  if (!types) return baseBadge

  return {
    ...baseBadge,
    admin: {
      ...baseBadge.admin,
      condition: (_, { type } = {}) => types.includes(type),
    },
  }
}
