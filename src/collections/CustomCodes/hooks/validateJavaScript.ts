import * as esprima from 'esprima'
import type { CollectionBeforeChangeHook } from 'payload'
import { APIError } from 'payload'
import type { CustomCode } from '@/payload-types'
import { SCRIPT_TYPES } from '../index'

function validateTrackingId(type: string, trackingId: string | null | undefined): boolean {
  if (!trackingId) return false

  switch (type) {
    case SCRIPT_TYPES.GOOGLE_ANALYTICS:
      return /^G-[A-Z0-9]+$/i.test(trackingId)
    case SCRIPT_TYPES.GOOGLE_TAG_MANAGER:
      return /^GTM-[A-Z0-9]+$/i.test(trackingId)
    default:
      return true
  }
}

function validateCustomScript(code: string): { isValid: boolean; error?: string } {
  try {
    if (!code) return { isValid: false, error: 'Script content is required' }

    // 提取脚本内容
    const content = code
      .replace(/<script[^>]*>/gi, '')
      .replace(/<\/script>/gi, '')
      .trim()

    // 跳过空内容或外部脚本
    if (!content || code.includes('src=')) {
      return { isValid: true }
    }

    // 验证 JS 语法
    esprima.parseScript(content, { tolerant: true })
    return { isValid: true }
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Invalid JavaScript code',
    }
  }
}

export const validateJavaScriptHook: CollectionBeforeChangeHook<CustomCode> = async ({
  data,
  operation,
}) => {
  if (operation === 'create' || operation === 'update') {
    if (data.scripts && Array.isArray(data.scripts)) {
      data.scripts = data.scripts.map((script, index) => {
        // 验证脚本类型和相应的字段
        switch (script.type) {
          case SCRIPT_TYPES.GOOGLE_ANALYTICS:
            if (!validateTrackingId(script.type, script.trackingId)) {
              throw new APIError(
                `Script ${index + 1}: Invalid tracking ID format for ${script.type}. Expected format: G-XXXXXXX`,
                400,
              )
            }
            // GA4 最佳实践：放在 head 中，使用 async 加载，在所有页面运行
            script.position = 'head'
            script.loadingStrategy = 'async'
            script.urlPattern = '' // 确保在所有页面运行
            break

          case SCRIPT_TYPES.GOOGLE_TAG_MANAGER:
            if (!validateTrackingId(script.type, script.trackingId)) {
              throw new APIError(
                `Script ${index + 1}: Invalid tracking ID format for ${script.type}. Expected format: GTM-XXXXXX`,
                400,
              )
            }
            // GTM 最佳实践：放在 head 中，使用 async 加载，在所有页面运行
            script.position = 'head'
            script.loadingStrategy = 'async'
            script.urlPattern = '' // 确保在所有页面运行
            break

          case SCRIPT_TYPES.CUSTOM:
            if (script.code) {
              const { isValid, error } = validateCustomScript(script.code)
              if (!isValid) {
                throw new APIError(`Script ${index + 1}: Invalid JavaScript: ${error}`, 400)
              }
            } else {
              throw new APIError(`Script ${index + 1}: Code is required for custom scripts`, 400)
            }

            // 对于自定义脚本，验证加载策略和位置
            if (
              script.loadingStrategy &&
              !['sync', 'async', 'defer'].includes(script.loadingStrategy)
            ) {
              throw new APIError(
                `Script ${index + 1}: Invalid loading strategy. Must be one of: sync, async, defer`,
                400,
              )
            }

            if (script.position && !['head', 'body-start', 'body-end'].includes(script.position)) {
              throw new APIError(
                `Script ${index + 1}: Invalid position. Must be one of: head, body-start, body-end`,
                400,
              )
            }

            // 验证 URL 模式（如果提供）
            if (script.urlPattern) {
              try {
                new RegExp(script.urlPattern.replace(/\*/g, '.*').replace(/\//g, '\\/'))
              } catch (error) {
                throw new APIError(
                  `Script ${index + 1}: Invalid URL pattern. Please use valid patterns like "/blog/*" or "/about", ${error}`,
                  400,
                )
              }
            }
            break

          default:
            throw new APIError(`Script ${index + 1}: Invalid script type`, 400)
        }

        return script
      })
    }
  }
  return data
}
