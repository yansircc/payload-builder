import type { GalleryBlock } from '@/payload-types'
import { galleryComponents } from './components'

export const RenderGallery: React.FC<GalleryBlock> = (props) => {
  const { style } = props || {}

  if (!style) return null

  const GalleryToRender = galleryComponents[style]

  if (!GalleryToRender) return null

  const galleryProps = props[style]
  if (!galleryProps) return null

  return <GalleryToRender {...galleryProps} />
}
