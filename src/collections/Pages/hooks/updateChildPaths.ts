import type { CollectionAfterChangeHook } from 'payload'
import type { Page } from '../../../payload-types'

export const updateChildPaths: CollectionAfterChangeHook<Page> = async ({
  doc,
  req,
  collection,
  operation,
  context,
}) => {
  console.log('updateChildPaths: Starting with doc:', {
    id: doc.id,
    slug: doc.slug,
    fullPath: doc.fullPath,
    parent: doc.parent,
  })

  // Skip if no fullPath (shouldn't happen, but type safety)
  if (!doc.fullPath) {
    console.log('updateChildPaths: No fullPath found, skipping')
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

    console.log(
      'updateChildPaths: Found child pages:',
      childPages.docs.map((page) => ({
        id: page.id,
        slug: page.slug,
        fullPath: page.fullPath,
        parent: page.parent,
      })),
    )

    // Update each child's fullPath
    await Promise.all(
      childPages.docs.map(async (childPage: Page) => {
        // Build the new fullPath based on the parent's fullPath
        const updatedFullPath =
          doc.slug === 'home' ? `home/${childPage.slug}` : `${doc.fullPath}/${childPage.slug}`

        console.log('updateChildPaths: Updating child page:', {
          id: childPage.id,
          oldPath: childPage.fullPath,
          newPath: updatedFullPath,
          parentSlug: doc.slug,
          parentFullPath: doc.fullPath,
        })

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
