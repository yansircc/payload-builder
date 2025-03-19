interface MediaObject {
  id?: string | null
  url?: string | null
  sizes?: Record<string, { url?: string | null }>
}

/**
 * Get the URL from a media object
 */
export const getImageURL = (media?: MediaObject | string | null): string | null => {
  if (!media) return null

  // If media is a string, assume it's already a URL or ID
  if (typeof media === 'string') {
    // Could be a direct URL
    if (media.startsWith('http')) {
      return media
    }

    // Otherwise, it's likely an ID without an accompanying URL, return null
    return null
  }

  // If media has a URL property, use that
  if (media.url) {
    return media.url
  }

  // Otherwise, return null
  return null
}
