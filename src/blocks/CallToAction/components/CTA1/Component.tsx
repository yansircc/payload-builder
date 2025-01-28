import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'
import type { CTA1Fields } from '@/payload-types'
import { DynamicIcon } from '@/components/Link/DynamicIcon'

export default function CTA1({ cta }: CTA1Fields) {
  const { title, subtitle, links, image, icon } = cta

  return (
    <section className="py-32">
      <div className="container max-w-5xl">
        <div className="flex flex-col justify-between md:flex-row">
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
            {links?.[0]?.['link-1'] && (
              <Button className="mt-8">
                {links[0]['link-1'].label} <ArrowRight className="ml-2 size-4" />
              </Button>
            )}
          </div>
          <div className="aspect-video md:max-w-96">
            <Media resource={image} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
