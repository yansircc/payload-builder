import type { CollectionAfterChangeHook } from 'payload'
import type { Page } from '../../../payload-types'

export const updateChildPaths: CollectionAfterChangeHook<Page> = async ({
  doc,
  req,
  collection,
  operation,
  context,
}) => {
  // Skip if no fullPath (shouldn't happen, but type safety)
  if (!doc.fullPath) {
    return doc
  }

  try {
    // Find all pages that have this page as their parent
    const childPages = await req.payload.find({
      collection: 'pages',
      where: {
        parent: {
          equals: doc.id,
        },
      },
      depth: 1, // Include one level of depth to get the parent relationship
    })

    // Update each child's fullPath
    await Promise.all(
      childPages.docs.map(async (childPage: Page) => {
        // Build the new fullPath based on the parent's fullPath
        const updatedFullPath =
          doc.slug === 'home' ? `home/${childPage.slug}` : `${doc.fullPath}/${childPage.slug}`

        // Update the child page with the new fullPath
        const updatedChild = await req.payload.update({
          collection: 'pages',
          id: childPage.id,
          data: {
            fullPath: updatedFullPath,
          },
        })

        // Recursively update this child's children
        await updateChildPaths({
          doc: updatedChild,
          req,
          collection,
          operation,
          context,
          previousDoc: childPage,
        })
      }),
    )
  } catch (error) {
    console.error('updateChildPaths: Error updating child paths:', error)
  }

  return doc
}
