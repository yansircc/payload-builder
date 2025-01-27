import type { FeatureBlock } from '@/payload-types'
import { featureComponents } from '.'

export const RenderFeature: React.FC<FeatureBlock> = (props) => {
  const { style } = props || {}

  if (!style || !(style in featureComponents)) return null

  const FeatureToRender = featureComponents[style as keyof typeof featureComponents]

  if (!FeatureToRender) return null

  // Extract only the props needed for the feature component
  const featureProps = {
    title: props.title,
    description: props.description,
    icon: props.icon,
    image: props.image,
    primaryButton: props.primaryButton,
    secondaryButton: props.secondaryButton,
  }

  return <FeatureToRender {...featureProps} />
}
