import { ValidationError } from 'payload'

const normalizeUrl = (value: string): string => {
  if (!value) return value

  // Check for special characters using a regex
  const specialCharsRegex = /[!@#$%^&*()_+\=\[\]{};':"\\|,<>?~]/
  if (specialCharsRegex.test(value)) {
    throw new ValidationError({
      errors: [
        {
          message: `Special characters are not allowed in redirect URLs`,
          path: 'from',
        },
      ],
    })
  }

  try {
    const urlObj = new URL(value, 'http://x')
    return urlObj.pathname
  } catch {
    return value.startsWith('/') ? value : `/${value}`
  }
}

const normalizeRedirectUrls = ({ value }: { value: string }): string => {
  return normalizeUrl(value)
}

export default normalizeRedirectUrls
