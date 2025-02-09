import { FieldHook } from 'payload'

export const syncPathname: FieldHook = async ({ data, value }) => {
  // Guard against missing breadcrumbs
  if (!data?.breadcrumbs?.length) {
    console.log('No breadcrumbs found')
    return value || ''
  }

  const lastBreadcrumbUrl = data.breadcrumbs.at(-1)?.url

  // Always return the last breadcrumb URL if it exists and is valid
  if (lastBreadcrumbUrl && lastBreadcrumbUrl !== '/undefined') {
    return lastBreadcrumbUrl
  }

  // Fallback to current value or empty string
  return value || ''
}
