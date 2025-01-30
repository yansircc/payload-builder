import type { FAQBlock } from '@/payload-types'
import { faqComponents } from '.'

export const RenderFAQ: React.FC<FAQBlock> = (props) => {
  const { style } = props || {}

  if (!style) return null

  const FAQToRender = faqComponents[style]

  if (!FAQToRender) return null

  const faqProps = props[style]
  if (!faqProps) return null

  return <FAQToRender {...faqProps} />
}
