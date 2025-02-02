import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'

export const buildInitialFormState = (fields: FormFieldBlock[]) => {
  return fields?.reduce((initialSchema, field) => {
    // 如果字段没有 name 属性，跳过
    if (!('name' in field)) {
      return initialSchema
    }

    if (field.blockType === 'checkbox') {
      return {
        ...initialSchema,
        [field.name]: field.defaultValue,
      }
    }
    if (field.blockType === 'country') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (field.blockType === 'email') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (field.blockType === 'text') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (field.blockType === 'select') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (field.blockType === 'state') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (field.blockType === 'textarea') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    // Provide default empty string value for unknown block types
    return {
      ...initialSchema,
      [field.name]: '',
    }
  }, {})
}
