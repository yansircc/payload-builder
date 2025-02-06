import type { Footer } from '@/payload-types'
import { getFooter } from '@/utilities/getGlobals'

import { footerComponents } from '.'

export const RenderFooter = async () => {
  const footerData: Footer = await getFooter()
  const { style } = footerData || {}

  if (!style) return null

  const FooterToRender = footerComponents[style]

  if (!FooterToRender) return null

  const footerProps = footerData[style]

  if (!footerProps) return null

  return <FooterToRender {...footerProps} />
}
