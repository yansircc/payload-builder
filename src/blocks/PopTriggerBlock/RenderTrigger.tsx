import { CMSLink } from '@/components/Link'

type PopupTriggerBlockProps = {
  className?: string
  ctaButton: any
}

export const PopupTriggerBlock: React.FC<PopupTriggerBlockProps> = ({ className, ctaButton }) => {
  return (
    <div className={className}>
      <CMSLink {...ctaButton.link} className="text-muted-foreground">
        {ctaButton.button?.label || 'Open Page'}
      </CMSLink>
    </div>
  )
}
