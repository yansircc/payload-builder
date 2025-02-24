import type { CollectionAfterDeleteHook } from 'payload'
import type { Page } from '@/payload-types'

export const deleteChildPages: CollectionAfterDeleteHook<Page> = async ({ doc, req, id }) => {
  try {
    // Find all pages that have this page as their parent
    const childPages = await req.payload.find({
      collection: 'pages',
      where: {
        parent: {
          equals: id,
        },
      },
      depth: 0,
    })

    // Update each child page to remove parent reference and update path
    await Promise.all(
      childPages.docs.map(async (page: Page) => {
        // Update the child page to remove parent and update fullPath
        await req.payload.update({
          collection: 'pages',
          id: page.id,
          data: {
            parent: null, // Remove parent reference
            fullPath: page.slug, // Reset fullPath to just the slug
          },
          context: {
            disableRevalidate: true, // Prevent revalidation for each child since parent is already deleted
          },
        })
      }),
    )

    req.payload.logger.info(
      `Updated ${childPages.docs.length} child pages for deleted parent page ${id}`,
    )
  } catch (error) {
    req.payload.logger.error(`Error updating child pages for deleted parent ${id}:`, error)
  }

  return doc
}
