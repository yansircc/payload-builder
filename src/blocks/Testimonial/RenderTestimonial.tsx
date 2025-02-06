import type { TestimonialBlock } from '@/payload-types'

import { testimonialComponents } from './components'

export const RenderTestimonial: React.FC<TestimonialBlock> = (props) => {
  const { style } = props || {}

  if (!style) return null

  const TestimonialToRender = testimonialComponents[style]

  if (!TestimonialToRender) return null

  const testimonailProps = props[style]
  if (!testimonailProps) return null

  return <TestimonialToRender {...testimonailProps} />
}
