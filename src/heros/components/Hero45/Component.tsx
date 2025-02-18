import { DynamicIcon } from '@/components/DynamicIcon'
import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { Hero45Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'

interface Feature {
  icon: string
  title: string
  description: string
}

export default function Hero45({ hero }: { hero: Hero45Fields['hero'] }) {
  const { badge, title, image, features } = hero

  return (
    <section className="py-section md:py-section-md lg:py-section-lg">
      <div className="container overflow-hidden">
        <ClientMotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20 flex flex-col items-center gap-6 text-center"
        >
          <Badge variant="outline">{badge}</Badge>
          <div>
            <h1 className="font-heading text-4xl font-bold tracking-tight lg:text-6xl">{title}</h1>
          </div>
        </ClientMotionDiv>

        <div className="relative mx-auto max-w-screen-lg">
          <ClientMotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Media
              resource={image}
              imgClassName="aspect-video max-h-[500px] w-full rounded-lg object-cover"
            />
          </ClientMotionDiv>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute -right-28 -top-28 -z-10 aspect-video h-72 w-96 opacity-40 [background-size:12px_12px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] sm:bg-[radial-gradient(var(--muted-foreground)_1px,transparent_1px)]" />
          <div className="absolute -left-28 -top-28 -z-10 aspect-video h-72 w-96 opacity-40 [background-size:12px_12px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] sm:bg-[radial-gradient(var(--muted-foreground)_1px,transparent_1px)]" />
        </div>

        <ClientMotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mx-auto mt-10 flex max-w-screen-lg flex-col md:flex-row"
        >
          {features?.map((feature: Feature, index: number) => {
            return (
              <div
                key={index}
                className="flex grow basis-0 flex-col rounded-md bg-background p-card"
              >
                {index > 0 && (
                  <Separator
                    orientation="vertical"
                    className="mx-6 hidden h-auto w-[2px] bg-gradient-to-b from-muted via-transparent to-muted md:block"
                  />
                )}
                <div className="mb-6 flex size-10 items-center justify-center rounded-full bg-background drop-shadow-lg">
                  <DynamicIcon name={feature.icon} className="h-auto w-5" />
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </ClientMotionDiv>
      </div>
    </section>
  )
}
