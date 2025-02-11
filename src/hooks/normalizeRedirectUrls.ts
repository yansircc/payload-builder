const normalizeUrl = (value: string): string => {
  if (!value) return value
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
