import { Star } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Avatar } from '@/components/ui/avatar'
import type { Hero7Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'
import { ThemeEffect } from '../shared/ThemeEffect'

export default function Hero7({ hero }: Hero7Fields) {
  const { title, subtitle, link, rating } = hero
  const { rate = 5, count = 0, avatars = [] } = rating || {}
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

        {link && (
          <ClientMotionDiv
            className="mt-10 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CMSLink {...link} size="lg" />
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
          {reviewCount > 0 && (
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="size-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="font-semibold">{rate}</span>
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
