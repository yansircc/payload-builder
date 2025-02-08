import type { CollectionBeforeChangeHook } from 'payload'
import type { CustomCode } from '@/payload-types'

function isValidJavaScript(code: string): { isValid: boolean; error?: string } {
  try {
    // Use the Function constructor to validate syntax
    new Function(code)
    return { isValid: true }
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : '无效的 JavaScript 代码',
    }
  }
}

export const validateJavaScriptHook: CollectionBeforeChangeHook<CustomCode> = async ({
  data,
  operation,
}) => {
  // Only validate when creating or updating
  if (operation === 'create' || operation === 'update') {
    const fieldsToValidate = ['headerScripts', 'bodyStartScripts', 'bodyEndScripts'] as const

    for (const field of fieldsToValidate) {
      const scriptContent = data[field]
      if (scriptContent) {
        const { isValid, error } = isValidJavaScript(scriptContent)
        if (!isValid) {
          throw new Error(`${field} 包含无效的 JavaScript: ${error}`)
        }
      }
    }
  }

  return data
}
