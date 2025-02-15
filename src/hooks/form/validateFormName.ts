import { ValidationError } from 'payload'

export const validateFormName = (value: string) => {
  if (value && !/^[a-z0-9-]+$/.test(value)) {
    throw new ValidationError({
      errors: [
        {
          message: 'Name must be lowercase and contain no special characters',
          path: 'name',
        },
      ],
    })
  }
  return true
}
