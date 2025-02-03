import type { Header } from '@/payload-types'
import { headerComponents } from '.'
import { getHeader } from '@/utilities/getGlobals'

export const RenderHeader = async () => {
  const headerData: Header = await getHeader()
  const { style } = headerData || {}

  if (!style) return null

  const HeaderToRender = headerComponents[style]

  if (!HeaderToRender) return null

  const headerProps = headerData[style]

  if (!headerProps) return null

  return <HeaderToRender {...headerProps} />
}
