import { Star } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Avatar } from '@/components/ui/avatar'
import type { Hero3Fields } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { ClientMotionDiv } from '../shared/motion'

export default function Hero3({ hero }: { hero: Hero3Fields['hero'] }) {
  const { title, subtitle, media, avatars, links, review } = hero

  return (
    <section className="py-section">
      <div className="container grid items-center gap-grid-gap lg:grid-cols-2">
        <ClientMotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-3xl lg:items-start lg:text-left"
        >
          <h1
            className={cn(
              'font-heading tracking-tight text-foreground',
              'my-6 text-pretty text-4xl font-bold lg:text-6xl xl:text-7xl',
            )}
          >
            {title}
          </h1>
          <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl font-sans">{subtitle}</p>
          <div className="mb-12 flex w-fit flex-col items-center gap-grid-gap-sm sm:flex-row">
            <span className="inline-flex items-center -space-x-4">
              {avatars?.map((avatar, i) => (
                <Avatar key={i} className="size-12 border-border border">
                  <Media
                    resource={avatar.image}
                    className="h-full w-full object-cover"
                    imgClassName="h-full w-full object-cover"
                  />
                </Avatar>
              ))}
            </span>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="font-semibold text-foreground">{review.rate}</span>
              </div>
              <p className="text-left font-medium text-muted-foreground">{review.count} reviews</p>
            </div>
          </div>
          <div className="flex w-full flex-col justify-center gap-grid-gap-sm sm:flex-row lg:justify-start">
            {links?.map((linkGroup, index) => (
              <div key={index} className="flex w-full flex-col gap-grid-gap-sm sm:flex-row">
                {Object.entries(linkGroup)
                  .filter(([key]) => key.startsWith('link-'))
                  .map(
                    ([key, link]) =>
                      link &&
                      typeof link === 'object' && (
                        <CMSLink
                          key={key}
                          className="inline-flex w-full items-center transition-button hover:scale-button-hover sm:w-auto"
                          {...link}
                        />
                      ),
                  )}
              </div>
            ))}
          </div>
        </ClientMotionDiv>

        <ClientMotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex bg-muted"
        >
          <Media
            resource={media.image}
            className="max-h-[600px] w-full rounded-md object-cover shadow-card lg:max-h-[800px]"
          />
        </ClientMotionDiv>
      </div>
    </section>
  )
}
