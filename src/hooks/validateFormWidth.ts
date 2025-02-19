import { ValidationError } from 'payload'

export const validateFormWidth = (value: number | string | any) => {
  // Log the value immediately as a stringified object to capture its current state
  console.log('Width validation - raw value:', value)
  console.log('Width validation - stringified:', JSON.stringify(value))

  // If value is an object, we need to handle it differently
  if (typeof value === 'object' && value !== null) {
    // Log the object properties
    console.log('Width validation - object properties:', Object.keys(value))

    // If we're expecting a specific property, extract it
    // For example, if we're looking for a 'width' property:
    const actualValue = value.width || value.value
    console.log('Width validation - extracted value:', actualValue)

    // Validate the extracted value
    if (actualValue) {
      const stringValue = String(actualValue)
      if (stringValue.toLowerCase().includes('e')) {
        throw new ValidationError({
          errors: [
            {
              message: 'Scientific notation (e) is not allowed',
              path: 'width',
            },
          ],
        })
      }
      if (!/^\d+$/.test(stringValue)) {
        throw new ValidationError({
          errors: [
            {
              message: 'Only whole numbers are allowed',
              path: 'width',
            },
          ],
        })
      }
    }
    return true
  }

  // Handle primitive values as before
  const stringValue = String(value)
  if (stringValue.toLowerCase().includes('e')) {
    throw new ValidationError({
      errors: [
        {
          message: 'Scientific notation (e) is not allowed',
          path: 'width',
        },
      ],
    })
  }
  if (!/^\d+$/.test(stringValue)) {
    throw new ValidationError({
      errors: [
        {
          message: 'Only whole numbers are allowed',
          path: 'width',
        },
      ],
    })
  }
  return true
}

export const widthFieldConfig = {
  min: 0,
  max: 100,
  admin: {
    step: 1,
    description: 'Enter a number between 0 and 100 (no decimals)',
  },
}
