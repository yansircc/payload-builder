import type { ContactBlock } from '@/payload-types'
import { contactComponents } from '.'

export const RenderContact: React.FC<ContactBlock> = (props) => {
  const { style } = props || {}

  if (!style) return null

  const ContactToRender = contactComponents[style]

  if (!ContactToRender) return null

  const contactProps = props[style]
  if (!contactProps) return null

  return <ContactToRender {...contactProps} />
}
