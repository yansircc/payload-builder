import { CollectionAfterChangeHook, PayloadRequest } from 'payload'

interface RedirectDoc {
  from?: string
  to?: string
  [key: string]: any
}

const normalizeRedirectUrls: CollectionAfterChangeHook = async ({
  doc,
  operation,
}: {
  doc: RedirectDoc
  req: PayloadRequest
  operation: 'create' | 'update' | 'delete'
}) => {
  if (operation === 'create' || operation === 'update') {
    const normalizeUrl = (url: string): string => {
      if (!url) return url
      try {
        // Just use a base URL to parse the pathname
        const urlObj = new URL(url, 'http://x')
        return urlObj.pathname
      } catch {
        return url.startsWith('/') ? url : `/${url}`
      }
    }

    // If the document has 'from' field, normalize it
    if ('from' in doc && typeof doc.from === 'string') {
      doc.from = normalizeUrl(doc.from)
    }
  }

  return doc
}

export default normalizeRedirectUrls
