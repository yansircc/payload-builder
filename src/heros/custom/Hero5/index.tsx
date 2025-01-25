import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Download } from 'lucide-react'
import type { Page } from '@/payload-types'

type Hero5Data = NonNullable<NonNullable<Page['hero']>['hero5']>

export default function Hero5({ title, description, media, links }: Hero5Data) {
  return (
    <section className="overflow-hidden py-32">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-20 lg:flex-row">
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <h1 className="text-pretty text-4xl font-bold lg:max-w-md lg:text-7xl">{title}</h1>
            {description && (
              <p className="max-w-xl text-xl font-medium lg:text-2xl">{description}</p>
            )}
            {links && links.length > 0 && (
              <div className="flex w-full justify-center lg:justify-start">
                {links.map(({ link }, i) => (
                  <CMSLink
                    key={i}
                    {...link}
                    size="lg"
                    className="w-full sm:w-auto"
                    prefixElement={<Download className="mr-2 size-5" />}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="relative aspect-video w-full lg:w-auto">
            <Media
              resource={media}
              fill
              className="rounded-md"
              imgClassName="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
