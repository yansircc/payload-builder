import type { ArrayField } from 'payload'

const baseFeatures: ArrayField = {
  name: 'features',
  type: 'array',
  fields: [
    {
      name: 'icon',
      type: 'text',
      required: true,
      admin: {
        description: '特性的图标名称，例如: Globe, Rocket, Expand, Wrench',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: '特性标题',
      },
    },
    {
      name: 'description',
      type: 'text',
      required: true,
      admin: {
        description: '特性描述',
      },
    },
  ],
  admin: {
    description: '特性列表，用于展示产品或服务的主要功能特点',
  },
}

export default function createFeaturesField(types?: string[]): ArrayField {
  if (!types) return baseFeatures

  return {
    ...baseFeatures,
    admin: {
      ...baseFeatures.admin,
      condition: (_, { type } = {}) => types.includes(type),
    },
  }
}
