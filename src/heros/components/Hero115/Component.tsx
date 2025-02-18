import { Play } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Hero115Fields } from '@/payload-types'
import { cn } from '@/utilities/ui'

export default function Hero115({ hero }: { hero: Hero115Fields['hero'] }) {
  const { title, subtitle, links, image, trustText } = hero
  const link = links?.[0]?.link

  return (
    <section className="overflow-hidden py-section md:py-section-md lg:py-section-lg">
      <div className="container">
        <div className="flex flex-col gap-5">
          <div className="relative flex flex-col gap-5">
            <div
              style={{
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute left-1/2 top-1/2 -z-10 mx-auto size-[800px] rounded-full border border-border p-16 [mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] md:size-[1300px] md:p-32"
            >
              <div className="size-full rounded-full border border-border p-16 md:p-32">
                <div className="size-full rounded-full border border-border"></div>
              </div>
            </div>
            <span className="mx-auto flex size-16 items-center justify-center rounded-full border border-border md:size-20">
              <Play className="size-6 fill-primary" />
            </span>

            <h1
              className={cn(
                'font-heading',
                'text-4xl md:text-6xl',
                'tracking-tight',
                'font-bold',
                'text-center',
                'mx-auto',
                'max-w-screen-lg',
                'text-foreground',
              )}
            >
              {title}
            </h1>
            <p
              className={cn(
                'text-muted-foreground',
                'text-base md:text-lg',
                'text-center',
                'mx-auto',
                'max-w-screen-md',
              )}
            >
              {subtitle}
            </p>
            <div className="flex flex-col items-center justify-center gap-3 pb-12 pt-3">
              {link && <CMSLink {...link} size="lg" />}
              <div className="text-xs text-muted-foreground">{trustText}</div>
            </div>
          </div>
          <Media
            resource={image}
            imgClassName="mx-auto h-full max-h-[524px] w-full max-w-screen-lg rounded-lg object-cover"
            alt="Hero image"
          />
        </div>
      </div>
    </section>
  )
}
