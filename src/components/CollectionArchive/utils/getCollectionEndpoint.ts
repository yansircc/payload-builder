type CollectionType = 'post' | 'product' | 'service'

/**
 * Maps a collection type to its API endpoint
 * @param type - The collection type ('post', 'product', 'service')
 * @returns The API endpoint for the collection
 */
export function getCollectionEndpoint(type: CollectionType): 'posts' | 'products' | 'services' {
  const endpoints: Record<CollectionType, 'posts' | 'products' | 'services'> = {
    post: 'posts',
    product: 'products',
    service: 'services',
  }

  return endpoints[type]
}
