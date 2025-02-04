import type { LogosBlock } from '@/payload-types'
import { logosComponents } from '.'

export const RenderLogos: React.FC<LogosBlock> = (props) => {
  const { style } = props || {}

  if (!style) return null

  const LogosToRender = logosComponents[style]

  if (!LogosToRender) return null

  const logosProps = props[style]
  if (!logosProps) return null

  return <LogosToRender {...logosProps} />
}
