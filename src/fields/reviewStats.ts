import type { GroupField } from 'payload'

const baseReviewStats: GroupField = {
  name: 'reviewStats',
  type: 'group',
  fields: [
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 5,
      defaultValue: 5,
      admin: {
        description: '评分 (0-5)',
      },
    },
    {
      name: 'reviewCount',
      type: 'number',
      min: 0,
      defaultValue: 0,
      admin: {
        description: '评论数量',
      },
    },
  ],
  admin: {
    description: '评论统计, 用于展示在卡片上',
  },
}

export default function createReviewStatsField(types?: string[]): GroupField {
  if (!types) return baseReviewStats

  return {
    ...baseReviewStats,
    admin: {
      ...baseReviewStats.admin,
      condition: (_, { type } = {}) => types.includes(type),
    },
  }
}
