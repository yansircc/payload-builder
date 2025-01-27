import { Play } from 'lucide-react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Hero115Fields } from '@/payload-types'

export default function Hero115({ hero }: { hero: Hero115Fields['hero'] }) {
  const { title, subtitle, link, image, trustText } = hero

  return (
    <section className="overflow-hidden py-32">
      <div className="container">
        <div className="flex flex-col gap-5">
          <div className="relative flex flex-col gap-5">
            <div
              style={{
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute left-1/2 top-1/2 -z-10 mx-auto size-[800px] rounded-full border p-16 [mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] md:size-[1300px] md:p-32"
            >
              <div className="size-full rounded-full border p-16 md:p-32">
                <div className="size-full rounded-full border"></div>
              </div>
            </div>
            <span className="mx-auto flex size-16 items-center justify-center rounded-full border md:size-20">
              <Play className="size-6 fill-primary" />
            </span>

            <h1 className="mx-auto max-w-screen-lg text-balance text-center text-3xl font-medium md:text-6xl">
              {title}
            </h1>
            <p className="mx-auto max-w-screen-md text-center text-muted-foreground md:text-lg">
              {subtitle}
            </p>
            <div className="flex flex-col items-center justify-center gap-3 pb-12 pt-3">
              <CMSLink {...link} size="lg" />
              <div className="text-xs text-muted-foreground">{trustText}</div>
            </div>
          </div>
          <Media
            resource={image}
            className="mx-auto h-full max-h-[524px] w-full max-w-screen-lg rounded-2xl object-cover"
            alt="Hero image"
          />
        </div>
      </div>
    </section>
  )
}
