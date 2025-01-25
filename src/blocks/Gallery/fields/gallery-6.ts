import { Field, GroupField } from 'payload'
import { z } from 'zod'
import { galleryCardFields } from './shared'

/**
 * Gallery 6 的字段配置
 */
export const fields: Field[] = [
  {
    name: 'cards',
    type: 'array',
    minRows: 1,
    maxRows: 6,
    fields: galleryCardFields,
    admin: {
      description: 'Max 6 cards',
      initCollapsed: false,
    },
  },
]

/**
 * Gallery card字段验证和类型定义
 */
export const schemas = {
  cards: z
    .array(
      z.object({
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
        /** 图片字段 */
        image: z.string(),
      }),
    )
    .min(1)
    .max(6),
}

/**
 * Gallery 6 的完整配置
 */
export const gallery6Fields: GroupField = {
  name: 'gallery-6',
  label: false,
  type: 'group',
  fields,
}
