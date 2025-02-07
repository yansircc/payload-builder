import { AboutBlock } from '@/payload-types'
import { aboutComponents } from '.'

export const RenderAbout: React.FC<AboutBlock> = (props) => {
  const { style } = props || {}

  if (!style) return null

  const AboutToRender = aboutComponents[style]

  if (!AboutToRender) return null

  const aboutProps = props[style]
  if (!aboutProps) return null

  return <AboutToRender {...aboutProps} />
}
