import { CMSLink } from '@/components/Link'
import { LinkPopupBlock as PLinkPopupBlockType } from '@/payload-types'

type LinkPopupBlockProps = PLinkPopupBlockType & {
  className?: string
}

export const RenderLinkPopup: React.FC<LinkPopupBlockProps> = ({ link, className }) => {
  return <CMSLink {...link} className={className} />
}
