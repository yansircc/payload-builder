import type { ArrayField } from 'payload'

const basePartners: ArrayField = {
  name: 'partners',
  type: 'array',
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: '合作伙伴的Logo',
      },
    },
    {
      name: 'link',
      type: 'text',
      required: true,
      admin: {
        description: '合作伙伴的链接',
      },
    },
    {
      name: 'height',
      type: 'number',
      defaultValue: 24,
      admin: {
        description: 'Logo的高度（单位：像素）',
      },
    },
  ],
  admin: {
    description: '合作伙伴列表, 用于展示在卡片上',
  },
}

export default function createPartnersField(types?: string[]): ArrayField {
  if (!types) return basePartners

  return {
    ...basePartners,
    admin: {
      ...basePartners.admin,
      condition: (_, { type } = {}) => types.includes(type),
    },
  }
}
