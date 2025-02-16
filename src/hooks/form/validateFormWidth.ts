import { ValidationError } from 'payload'

export const validateFormWidth = (value: number | string) => {
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
