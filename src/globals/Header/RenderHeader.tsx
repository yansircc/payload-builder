import type { Header } from '@/payload-types'
import { getHeader } from '@/utilities/getGlobals'
import { headerComponents } from '.'

export const RenderHeader = async () => {
  const headerData: Header | null = await getHeader()
  if (!headerData) return null

  const { style } = headerData || {}

  if (!style) return null

  const HeaderToRender = headerComponents[style]

  if (!HeaderToRender) return null

  const headerProps = headerData[style]

  if (!headerProps) return null

  return <HeaderToRender {...headerProps} />
}
