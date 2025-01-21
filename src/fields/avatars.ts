import type { ArrayField } from 'payload'

// 基础头像组配置
const baseAvatars: ArrayField = {
  name: 'avatars',
  type: 'array',
  maxRows: 5,
  fields: [
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
  admin: { description: '最多支持5个头像' },
}

// 创建可选类型条件的头像组字段
export default function createAvatarGroupField(types?: string[]): ArrayField {
  if (!types) return baseAvatars

  return {
    ...baseAvatars,
    admin: {
      ...baseAvatars.admin,
      condition: (_, { type } = {}) => types.includes(type),
    },
  }
}
