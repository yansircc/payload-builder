import { link } from '@/fields/link'
import { Field, GroupField } from 'payload'
import { z } from 'zod'

/**
 * Gallery card字段配置
 */
export const galleryCardFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    defaultValue: 'Natural Language Processing',
    required: true,
  },
  {
    name: 'excerpt',
    type: 'text',
    required: true,
    defaultValue:
      'Advanced AI algorithms that understand and process human language, enabling seamless communication between users and machines through text and speech.',
  },
  link({
    overrides: {
      admin: {
        description: 'A related link address',
      },
    },
  }),
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
]

/**
 * Gallery card字段验证和类型定义
 */
export const schemas = {
  /** 标题字段: 简短有力的标题 */
  title: z.string().describe('A short and powerful title, max 20 characters'),
  /** 描述字段: 详细的描述文本 */
  excerpt: z
    .string()
    .describe(
      'A detailed description text, in Chinese, max 100 characters, include exclamation marks to add emotion',
    ),
  /** 链接字段: 相关链接 */
  link: z.string().describe('A related link address'),
}

/**
 * Gallery card的完整配置
 */
export const galleryCard: GroupField = {
  name: 'gallery-card',
  type: 'group',
  fields: galleryCardFields,
}
