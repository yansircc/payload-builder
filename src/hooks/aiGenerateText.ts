import type { FieldHook } from 'payload'
import { APIError } from 'payload'
import { z } from 'zod'
import { createAIFieldProcessor, FieldProcessor, processFields } from '@/utilities/fieldProcessors'

/**
 * PayloadCMS 字段值类型
 */
type PayloadFieldValue =
  | string
  | number
  | boolean
  | null
  | PayloadFieldValue[]
  | { [key: string]: PayloadFieldValue }

/**
 * AI字段值的基础接口
 */
interface BaseFieldValue {
  [key: string]: PayloadFieldValue | undefined
}

/**
 * API Keys 的类型定义
 */
interface ApiKeys {
  keys?: Array<{
    openai: string
    deepseek: string
    id: string
  }>
}

/**
 * 创建 AI 字段处理器的 hook
 * @param schemas - 字段的 schema 定义
 * @returns beforeChange hook 函数
 */
export function createAIFieldsHook<T extends BaseFieldValue>(
  schemas: Record<keyof T, z.ZodType<any>>,
): FieldHook {
  return async ({ value, req }) => {
    // 如果值为空，返回 undefined 让 PayloadCMS 处理
    if (!value) return undefined

    try {
      // 使用 req.payload 获取 API Keys
      const apiKeys = (await req.payload.findGlobal({
        slug: 'api-key',
        depth: 0,
      })) as ApiKeys

      // 获取第一组 API Keys
      const keys = apiKeys.keys?.[0]
      if (!keys) {
        throw new APIError('Please set API Keys in Global Config', 400)
      }

      if (!keys.openai || !keys.deepseek) {
        throw new APIError('OpenAI and DeepSeek API Keys are required', 400)
      }

      // TODO: Add DeepSeek API

      // 为每个字段创建处理器
      const processors = Object.entries(schemas).reduce<
        Record<keyof T, FieldProcessor<any, z.ZodType<any>>>
      >(
        (acc, [fieldKey, schema]) => ({
          ...acc,
          [fieldKey]: createAIFieldProcessor({
            schema,
            fieldKey,
          }),
        }),
        {} as Record<keyof T, FieldProcessor<any, z.ZodType<any>>>,
      )

      const result = await processFields(value as T, processors)
      return result
    } catch (err) {
      // 如果是 APIError，直接抛出
      if (err instanceof APIError) {
        throw err
      }
      // 其他错误转换为友好的错误消息
      console.error('Field processing error:', err)
      throw new APIError(
        'An error occurred while processing the field, please try again later',
        400,
      )
    }
  }
}
