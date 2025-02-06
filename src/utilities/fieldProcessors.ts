import { z } from 'zod'

import { getObject } from './ai'

/**
 * 字段处理器的配置接口
 */
interface FieldProcessorConfig<T extends z.ZodType> {
  /** Zod schema 用于验证和类型定义 */
  schema: T
  /** 字段名称 */
  fieldKey: string
}

/**
 * 通用字段值处理器接口
 */
export interface FieldProcessor<T, S extends z.ZodType<T>> {
  /** 处理字段值并返回处理后的结果 */
  process: (value: T) => Promise<T>
  /** 字段的 schema */
  schema: S
}

/**
 * 检查值是否为纯 # 符号
 */
export function isPureHash(value: unknown): boolean {
  return typeof value === 'string' && value.trim() === '#'
}

/**
 * 创建 AI 字段处理器
 * @param config - 处理器配置
 * @returns 字段处理器实例
 */
export function createAIFieldProcessor<T, S extends z.ZodType<T>>({
  schema,
  fieldKey,
}: FieldProcessorConfig<S>): FieldProcessor<T, S> {
  return {
    schema,
    async process(value: T): Promise<T> {
      if (!isPureHash(value)) {
        return value
      }

      try {
        // 构建单字段的 schema 对象
        const requestSchema = z.object({
          [fieldKey]: schema,
        })

        const response = await getObject(requestSchema)
        return response[fieldKey] as T
      } catch (error) {
        console.error(`AI 处理字段 ${fieldKey} 时出错:`, error)
        return value
      }
    },
  }
}

/**
 * 处理多个字段的工具函数
 * @param fields - 需要处理的字段映射
 * @param processors - 字段处理器映射
 * @returns 处理后的字段对象
 */
export async function processFields<
  T extends Record<string, unknown>,
  P extends Record<keyof T, FieldProcessor<T[keyof T], z.ZodType<T[keyof T]>>>,
>(fields: T, processors: P): Promise<T> {
  // 收集所有需要 AI 处理的字段
  const hashFields: Record<string, z.ZodType> = {}
  const normalFields: Partial<T> = {}

  // 分离需要 AI 处理的字段和普通字段
  for (const [key, value] of Object.entries(fields)) {
    const processor = processors[key as keyof T]
    if (processor && isPureHash(value)) {
      hashFields[key] = processor.schema
    } else {
      normalFields[key as keyof T] = value as T[keyof T]
    }
  }

  // 如果有需要 AI 处理的字段
  if (Object.keys(hashFields).length > 0) {
    try {
      // 构建组合的 schema
      const combinedSchema = z.object(hashFields)

      // 发送单个 AI 请求处理所有 # 字段
      const aiResponse = await getObject(combinedSchema)

      // 合并 AI 响应和普通字段
      return {
        ...normalFields,
        ...aiResponse,
      } as T
    } catch (error) {
      console.error('批量处理字段时出错:', error)
      return fields
    }
  }

  return fields
}
