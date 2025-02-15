import { validateFormName } from './validateFormName'
import { validateFormWidth, widthFieldConfig } from './validateFormWidth'

export const processRowField = (rowField: any) => {
  // Add validation for name field - lowercase, no special characters
  if (rowField.name === 'name') {
    return {
      ...rowField,
      validate: validateFormName,
    }
  }

  // Add validation for width field - numbers only, no 'e'
  if (rowField.name === 'width') {
    return {
      ...rowField,
      ...widthFieldConfig,
      validate: validateFormWidth,
    }
  }

  return rowField
}

export const processBlockField = (blockField: any) => {
  // Handle row type fields
  if (blockField.type === 'row' && blockField.fields) {
    return {
      ...blockField,
      fields: blockField.fields.map(processRowField),
    }
  }

  // Handle non-row width fields
  if (blockField.name === 'width') {
    return {
      ...blockField,
      ...widthFieldConfig,
      validate: validateFormWidth,
    }
  }

  return blockField
}
