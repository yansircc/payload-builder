import type { Footer } from '@/payload-types'
import { footerComponents } from '.'

export const RenderFooter: React.FC<Footer> = async (props) => {
  const { style } = props || {}

  if (!style) return null

  const FooterToRender = footerComponents[style]

  if (!FooterToRender) return null

  const footerProps = props[style]

  if (!footerProps) return null

  return <FooterToRender {...footerProps} />
}
