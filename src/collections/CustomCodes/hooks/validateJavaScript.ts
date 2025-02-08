import * as esprima from 'esprima'
import type { CollectionBeforeChangeHook } from 'payload'
import { APIError } from 'payload'
import type { CustomCode } from '@/payload-types'

interface ScriptAnalysis {
  type: 'inline' | 'external' | 'pure-js'
  content: string
  src?: string
}

function analyzeScript(code: string): ScriptAnalysis {
  const trimmedCode = code.trim()

  // Check if the code contains script tags
  const hasScriptTags = /<script[\s>]/i.test(trimmedCode)

  if (!hasScriptTags) {
    // Pure JavaScript code without script tags
    return {
      type: 'pure-js',
      content: trimmedCode,
    }
  }

  // Check if it's an external script tag
  const externalScriptMatch = trimmedCode.match(/<script[^>]*src=["']([^"']+)["'][^>]*>/i)
  if (externalScriptMatch) {
    return {
      type: 'external',
      content: trimmedCode,
      src: externalScriptMatch[1],
    }
  }

  // If it has script tags but no src, it's inline
  return {
    type: 'inline',
    content: trimmedCode,
  }
}

function validateScriptTags(code: string): { isValid: boolean; error?: string } {
  const hasScriptTags = /<script[\s>]/i.test(code)

  // If no script tags, it's valid (pure JS)
  if (!hasScriptTags) return { isValid: true }

  // Count opening and closing script tags
  const openTags = (code.match(/<script[^>]*>/g) || []).length
  const closeTags = (code.match(/<\/script>/g) || []).length

  if (openTags !== closeTags) {
    return {
      isValid: false,
      error: 'Mismatched script tags. Make sure all script tags are properly closed.',
    }
  }

  return { isValid: true }
}

function extractJavaScript(code: string): string {
  const analysis = analyzeScript(code)

  if (analysis.type === 'pure-js') {
    return analysis.content
  }

  // For inline scripts, extract content between script tags
  if (analysis.type === 'inline') {
    const content = code
      .replace(/<script[^>]*>/g, '')
      .replace(/<\/script>/g, '')
      .trim()
    return content
  }

  // For external scripts, we don't need to validate the content
  return ''
}

function isValidJavaScript(code: string): { isValid: boolean; error?: string } {
  try {
    const jsContent = extractJavaScript(code)

    // Skip validation for empty content (e.g., external scripts)
    if (!jsContent) return { isValid: true }

    // 使用 esprima 进行语法验证
    esprima.parseScript(jsContent, { tolerant: true })
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
  // Only validate when creating or updating
  if (operation === 'create' || operation === 'update') {
    if (data.scripts && Array.isArray(data.scripts)) {
      data.scripts = data.scripts.map((script, index) => {
        if (script.code) {
          // First validate script tag structure (if any)
          const tagValidation = validateScriptTags(script.code)
          if (!tagValidation.isValid) {
            throw new APIError(
              `Script ${index + 1}: ${tagValidation.error || 'Invalid script tags'}`,
              400,
            )
          }

          // Then validate the JavaScript content
          const { isValid, error } = isValidJavaScript(script.code)
          if (!isValid) {
            throw new APIError(`Script ${index + 1}: Invalid JavaScript: ${error}`, 400)
          }
        }
        return script
      })
    }
  }

  return data
}
