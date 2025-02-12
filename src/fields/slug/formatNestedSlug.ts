import type { FieldHook } from 'payload'

interface PageData {
  parent?:
    | {
        id: string
      }
    | string
}

export const formatNestedSlug: FieldHook = async ({ data, value, req }) => {
  // If no value is provided, return as is
  if (!value) return value

  const pageData = data as PageData

  // If no parent is selected, return the current slug
  if (!pageData.parent) return value

  try {
    // Fetch the parent page to get its slug
    const parentPage = await req.payload.findByID({
      collection: 'pages',
      id: typeof pageData.parent === 'object' ? pageData.parent.id : pageData.parent,
    })

    // If parent page exists and has a slug, combine them
    if (parentPage && parentPage.slug) {
      return `${parentPage.slug}/${value}`
    }

    // If parent page doesn't exist or has no slug, return current slug
    return value
  } catch (error) {
    console.error('Error fetching parent page:', error)
    return value
  }
}
