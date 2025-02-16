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
        async ({ data, req }) => {
          const pageData = data as PageData

          // Special handling for home page
          if (pageData.slug === 'home') {
            return 'home'
          }

          // Start with the current slug
          let path = pageData.slug || ''

          // If there's a parent, recursively build the full path
          if (pageData.parent) {
            try {
              const parentId =
                typeof pageData.parent === 'object' ? pageData.parent.id : pageData.parent

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
              } else if (parentPage.fullPath) {
                path = `${parentPage.fullPath}/${pageData.slug}`
              }
            } catch (error) {
              console.error('Error fetching parent page:', error)
            }
          }

          return path
        },
      ],
    },
  }

  return [slugField, checkBoxField, fullPathField]
}
