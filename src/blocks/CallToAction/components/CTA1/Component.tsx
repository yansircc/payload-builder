import { ClientMotionDiv } from '@/blocks/shared'
import { DynamicIcon } from '@/components/DynamicIcon'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { ImageMedia } from '@/components/Media/ImageMedia'
import { Card } from '@/components/ui/card'
import type { CTA1Fields } from '@/payload-types'

export default function CTA1({ title, subtitle, btn, image, icon }: CTA1Fields) {
  return (
    <section className="py-32">
      <div className="container max-w-5xl">
        <Card className="flex flex-col justify-between md:flex-row">
          <div className="p-6 md:max-w-96">
            <div className="mb-2 flex items-center gap-2">
              {icon && (
                <span className="flex size-7 items-center justify-center rounded-full bg-muted">
                  <DynamicIcon name={icon} className="size-4" />
                </span>
              )}
              <h4 className="text-2xl font-bold">{title}</h4>
            </div>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            {btn && (
              <ClientMotionDiv
                className="mt-11 flex flex-col gap-2 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full sm:w-auto">
                  <CMSLink {...btn} className="w-full sm:w-auto" />
                </div>
              </ClientMotionDiv>
            )}
          </div>
          {image && (
            <ImageMedia resource={image} imgClassName="aspect-video object-cover md:max-w-96" />
          )}
        </Card>
      </div>
    </section>
  )
}
