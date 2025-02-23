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
 * Basic interface for AI field values
 */
interface BaseFieldValue {
  [key: string]: PayloadFieldValue | undefined
}

interface SiteSettings {
  ai?: {
    openai?: string
    deepseek?: string
  }
}

/**
 * Create an AI field processor hook
 * @param schemas - The schema definition for the field
 * @returns The beforeChange hook function
 */
export function createAIFieldsHook<T extends BaseFieldValue>(
  schemas: Record<keyof T, z.ZodType<any>>,
): FieldHook {
  return async ({ value, req }) => {
    // If the value is empty, return undefined to let PayloadCMS handle it
    if (!value) return undefined

    try {
      // Get API Keys from site-settings
      const siteSettings = (
        await req.payload.find({
          collection: 'site-settings',
          limit: 1,
          depth: 0,
        })
      ).docs[0] as SiteSettings

      if (!siteSettings?.ai?.openai || !siteSettings?.ai?.deepseek) {
        throw new APIError('OpenAI and DeepSeek API Keys are required in Site Settings', 400)
      }

      // TODO: Add DeepSeek API

      // Create a processor for each field
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
      // If it's an APIError, throw it directly
      if (err instanceof APIError) {
        throw err
      }
      // Convert other errors to a friendly error message
      console.error('Field processing error:', err)
      throw new APIError(
        'An error occurred while processing the field, please try again later',
        400,
      )
    }
  }
}
