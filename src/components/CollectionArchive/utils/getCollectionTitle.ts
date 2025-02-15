type CollectionType = 'post' | 'product' | 'service'

/**
 * Get the collection title based on the collection type
 * @param type - The collection type ('post', 'product', 'service')
 * @returns The formatted title for the collection
 */
export function getCollectionTitle(type: CollectionType): string {
  const titles: Record<CollectionType, string> = {
    post: 'Posts',
    product: 'Products',
    service: 'Services',
  }

  return titles[type]
}
