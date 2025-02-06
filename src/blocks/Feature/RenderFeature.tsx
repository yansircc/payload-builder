import type { FeatureBlock } from '@/payload-types'

import { featureComponents } from '.'

export const RenderFeature: React.FC<FeatureBlock> = (props) => {
  const { style } = props || {}

  if (!style) return null

  const FeatureToRender = featureComponents[style]

  if (!FeatureToRender) return null

  const featureProps = props[style]
  if (!featureProps) return null

  return <FeatureToRender {...featureProps} />
}
