type ArchiveStyle = 'grid' | 'list' | 'card'
type CollectionType = 'post' | 'product' | 'service'

type ArchiveSettings = {
  posts?: ArchiveStyle | null
  products?: ArchiveStyle | null
  services?: ArchiveStyle | null
}

// Get style based on collection type
export const getArchiveStyle = (
  settings: ArchiveSettings | undefined,
  type: CollectionType,
): ArchiveStyle => {
  switch (type) {
    case 'post':
      return settings?.posts || 'grid'
    case 'product':
      return settings?.products || 'grid'
    case 'service':
      return settings?.services || 'grid'
    default:
      return 'grid'
  }
}
