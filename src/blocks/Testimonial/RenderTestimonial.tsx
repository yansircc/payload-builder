import type { TestimonialBlock } from '@/payload-types'
import { testimonialComponents } from './components'

export const RenderTestimonial: React.FC<TestimonialBlock> = (props) => {
  const { style } = props || {}

  if (!style) return null

  const TestimonialToRender = testimonialComponents[style]

  if (!TestimonialToRender) return null

  const contactProps = props[style]
  if (!contactProps) return null

  return <TestimonialToRender {...contactProps} />
}
