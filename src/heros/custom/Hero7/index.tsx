import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'

import { ClientMotionDiv } from '@/heros/share/motion'
import { ThemeEffect } from '@/heros/share/ThemeEffect'

type Hero7Data = NonNullable<NonNullable<Page['hero']>['hero7']>

export default function Hero7({ title, description, cta, avatars, review }: Hero7Data) {
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
          {description && (
            <p className="text-balance text-muted-foreground lg:text-lg">{description}</p>
          )}
        </ClientMotionDiv>

        <ClientMotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button size="lg" className="mt-10">
            {cta.label}
          </Button>
        </ClientMotionDiv>

        <ClientMotionDiv
          className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {/* 头像墙 */}
          {avatars && avatars.length > 0 && (
            <span className="mx-4 inline-flex items-center -space-x-4">
              {avatars.map(({ avatar }, i) => (
                <Avatar key={i} className="size-14 border">
                  {avatar && typeof avatar === 'object' && (
                    <Media resource={avatar} fill className="object-cover" />
                  )}
                </Avatar>
              ))}
            </span>
          )}

          {/* 评分 */}
          {review && review.rating && review.count && (
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="font-semibold">{review.rating.toFixed(1)}</span>
              </div>
              <p className="text-left font-medium text-muted-foreground">
                from {review.count}+ reviews
              </p>
            </div>
          )}
        </ClientMotionDiv>
      </div>
    </section>
  )
}
