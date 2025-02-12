import type { CheckboxField, TextField } from 'payload'
import { ensureUniqueSlug } from '@/collections/Pages/hooks/ensureUniqueSlug'
import { formatSlugHook } from './formatSlug'

type Overrides = {
  slugOverrides?: Partial<TextField>
  checkboxOverrides?: Partial<CheckboxField>
}

interface PageData {
  slug?: string
  parent?:
    | {
        id: string
        slug?: string
      }
    | string
}

type Slug = (fieldToUse?: string, overrides?: Overrides) => [TextField, CheckboxField, TextField]

export const slugField: Slug = (fieldToUse = 'title', overrides = {}) => {
  const { slugOverrides, checkboxOverrides } = overrides

  const checkBoxField: CheckboxField = {
    name: 'slugLock',
    type: 'checkbox',
    defaultValue: true,
    admin: {
      hidden: true,
      position: 'sidebar',
    },
    ...checkboxOverrides,
  }

  // Expect ts error here because of typescript mismatching Partial<TextField> with TextField
  // @ts-expect-error
  const slugField: TextField = {
    name: 'slug',
    type: 'text',
    index: true,
    label: 'Slug',
    ...(slugOverrides || {}),
    hooks: {
      // Only format the individual slug portion
      beforeValidate: [formatSlugHook(fieldToUse), ensureUniqueSlug],
    },
    admin: {
      position: 'sidebar',
      ...(slugOverrides?.admin || {}),
      components: {
        Field: {
          path: '@/fields/slug/SlugComponent#SlugComponent',
          clientProps: {
            fieldToUse,
            checkboxFieldPath: checkBoxField.name,
          },
        },
      },
    },
  }

  // Add a new field for the full path that includes parent paths
  const fullPathField: TextField = {
    name: 'fullPath',
    type: 'text',
    index: true,
    admin: {
      hidden: true, // Hide from admin UI since it's auto-generated
    },
    hooks: {
      beforeChange: [
        async ({ data, req, operation }) => {
          console.log('fullPath beforeChange hook - Operation:', operation)
          console.log('fullPath beforeChange hook - Input data:', data)

          const pageData = data as PageData

          // Special handling for home page
          if (pageData.slug === 'home') {
            console.log('Home page detected, setting fullPath to "home"')
            return 'home'
          }

          // Start with the current slug
          let path = pageData.slug || ''

          // If there's a parent, recursively build the full path
          if (pageData.parent) {
            try {
              const parentId =
                typeof pageData.parent === 'object' ? pageData.parent.id : pageData.parent
              console.log('Fetching parent page with ID:', parentId)

              const parentPage = await req.payload.findByID({
                collection: 'pages',
                id: parentId,
                depth: 1, // Include one level of depth to get the parent's fullPath
              })

              console.log('Parent page details:', {
                id: parentPage.id,
                slug: parentPage.slug,
                fullPath: parentPage.fullPath,
              })

              if (parentPage.slug === 'home') {
                path = `home/${pageData.slug}`
                console.log('Parent is home, using path:', path)
              } else if (parentPage.fullPath) {
                path = `${parentPage.fullPath}/${pageData.slug}`
                console.log('Generated nested path:', path)
              } else {
                console.log('Parent page has no fullPath:', parentPage)
              }
            } catch (error) {
              console.error('Error fetching parent page:', error)
            }
          } else {
            console.log('No parent page found, using path:', path)
          }

          console.log('Final fullPath value:', path)
          return path
        },
      ],
    },
  }

  return [slugField, checkBoxField, fullPathField]
}
