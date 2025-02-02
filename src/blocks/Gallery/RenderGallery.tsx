import type { GalleryBlock } from '@/payload-types'
import { galleryComponents } from './components'

export const RenderGallery: React.FC<GalleryBlock> = (props) => {
  const { style } = props || {}

  if (!style) return null

  const TestimonialToRender = galleryComponents[style]

  if (!TestimonialToRender) return null

  const contactProps = props[style]
  if (!contactProps) return null

  return <TestimonialToRender {...contactProps} />
}
