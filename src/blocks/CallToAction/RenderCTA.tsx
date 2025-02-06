import type { CTABlock } from '@/payload-types'

import { ctaComponents } from './index'

export const RenderCTA: React.FC<CTABlock> = (props) => {
  const { style } = props || {}

  if (!style) return null

  const CTAToRender = ctaComponents[style]

  if (!CTAToRender) return null

  const ctaProps = props[style]
  if (!ctaProps) return null

  return <CTAToRender {...ctaProps} />
}
