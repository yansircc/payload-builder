import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Avatar } from '@/components/ui/avatar'
import { Star } from 'lucide-react'

import { ClientMotionDiv } from '../shared/motion'
import { ThemeEffect } from '../shared/ThemeEffect'
import type { Hero7Fields } from '@/payload-types'

export default function Hero7({ hero }: Hero7Fields) {
  const { heroBase, rate } = hero
  const { title, subtitle, links } = heroBase
  const { avatars = [], rate: rating = 5, count = 0 } = rate || {}
  const reviewCount = typeof count === 'number' ? count : 0

  return (
    <section className="py-32">
      <ThemeEffect theme="dark" />
      <div className="container text-center">
        <ClientMotionDiv
          className="mx-auto flex max-w-screen-lg flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-extrabold lg:text-6xl">{title}</h1>
          {subtitle && <p className="text-balance text-muted-foreground lg:text-lg">{subtitle}</p>}
        </ClientMotionDiv>

        {links && links.length > 0 && (
          <ClientMotionDiv
            className="mt-10 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {links.map(({ link }, i) => (
              <CMSLink key={i} {...link} size="lg" />
            ))}
          </ClientMotionDiv>
        )}

        <ClientMotionDiv
          className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {/* Avatar Wall */}
          {avatars && avatars.length > 0 && (
            <span className="mx-4 inline-flex items-center -space-x-4">
              {avatars.map(({ avatar }, index) => (
                <Avatar key={index} className="size-14 border">
                  {avatar && typeof avatar === 'object' && (
                    <Media resource={avatar} fill className="object-cover" />
                  )}
                </Avatar>
              ))}
            </span>
          )}

          {/* Rating */}
          {rating && reviewCount > 0 && (
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="size-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="font-semibold">{rating.toFixed(1)}</span>
              </div>
              <p className="text-left font-medium text-muted-foreground">
                from {reviewCount}+ reviews
              </p>
            </div>
          )}
        </ClientMotionDiv>
      </div>
    </section>
  )
}
