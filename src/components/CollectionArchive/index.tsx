import { PaginatedDocs } from 'payload'
import React from 'react'
import type { Post, Product } from '@/payload-types'
import { getSiteSettings } from '@/utilities/getSiteSettings'
import Style1 from './Style1/Component'
import Style2 from './Style2/Component'
import { getArchiveStyle } from './utils/getArchiveStyle'

type CollectionType = 'post' | 'product' | 'service'

const STYLE_COMPONENTS = {
  card: Style1,
  list: Style2,
  grid: Style1,
} as const

export type Props = {
  items: PaginatedDocs<Post | Product>
  type: CollectionType
}

export const CollectionArchive: React.FC<Props> = async (props) => {
  const { type } = props
  const siteSettings = await getSiteSettings()

  const styleKey = getArchiveStyle(siteSettings?.archiveStyles, type)
  const ArchiveComponent = STYLE_COMPONENTS[styleKey]

  return <ArchiveComponent {...props} />
}
