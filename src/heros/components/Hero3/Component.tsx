import { ArrowDownRight, Star } from 'lucide-react'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Hero3Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'

export default function Hero3({ hero }: { hero: Hero3Fields['hero'] }) {
  const { title, subtitle, media, avatars, links, review } = hero

  return (
    <section className="py-32">
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <ClientMotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-3xl lg:items-start lg:text-left"
        >
          <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl xl:text-7xl">{title}</h1>
          <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">{subtitle}</p>
          <div className="mb-12 flex w-fit flex-col items-center gap-4 sm:flex-row">
            <span className="inline-flex items-center -space-x-4">
              {avatars?.map((avatar, i) => (
                <Avatar key={i} className="size-12 border">
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
                <span className="font-semibold">{review.rate}</span>
              </div>
              <p className="text-left font-medium text-muted-foreground">{review.count} reviews</p>
            </div>
          </div>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
            {links?.map((link, i) => {
              const isSecondary = i === 1
              const { label, ...linkProps } = link.link
              return (
                <CMSLink
                  key={i}
                  {...linkProps}
                  className="inline-flex w-full items-center sm:w-auto"
                  appearance={isSecondary ? 'outline' : 'default'}
                >
                  {label}
                  {isSecondary && <ArrowDownRight className="ml-2 size-4" />}
                </CMSLink>
              )
            })}
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
            className="max-h-[600px] w-full rounded-md object-cover lg:max-h-[800px]"
          />
        </ClientMotionDiv>
      </div>
    </section>
  )
}
