import type { Footer } from '@/payload-types'
import { footerComponents } from '.'
import { getFooter } from '@/utilities/getGlobals'

export const RenderFooter = async () => {
  const footerData: Footer | null = await getFooter()
  if (!footerData) return null

  const { style } = footerData || {}

  if (!style) return null

  const FooterToRender = footerComponents[style]

  if (!FooterToRender) return null

  const footerProps = footerData[style]

  if (!footerProps) return null

  return <FooterToRender {...footerProps} />
}
