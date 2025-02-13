import React from 'react'
import type { Post, Product } from '@/payload-types'
import { getSiteSettings } from '@/utilities/getSiteSettings'
import Style1 from './Style1/Component'
import { getArchiveStyle } from './utils/getArchiveStyle'

type CollectionType = 'post' | 'product' | 'service'

const STYLE_COMPONENTS = {
  grid: Style1,
  list: Style1, // Replace with Style2 when available
  card: Style1, // Replace with Style3 when available
} as const

export type Props = {
  items: Post[] | Product[]
  type: CollectionType
}

export const CollectionArchive: React.FC<Props> = async (props) => {
  const { items, type } = props
  const siteSettings = await getSiteSettings()

  const styleKey = getArchiveStyle(siteSettings?.archiveStyles, type)
  const ArchiveComponent = STYLE_COMPONENTS[styleKey]

  return <ArchiveComponent items={items} />
}
