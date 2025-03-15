import { Star } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Avatar } from '@/components/ui/avatar'
import type { Hero3Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'

export default function Hero3({
  title,
  subtitle,
  image,
  avatars,
  links,
  rating,
  reviewCount,
}: Hero3Fields) {
  return (
    <section className="py-section md:py-section-md lg:py-section-lg">
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <ClientMotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-3xl lg:items-start lg:text-left"
        >
          <h1 className="font-heading tracking-tight text-foreground my-6 text-pretty text-4xl font-bold lg:text-6xl xl:text-7xl">
            {title}
          </h1>
          <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl font-sans">{subtitle}</p>
          <div className="mb-12 flex w-fit flex-col items-center gap-4 sm:flex-row">
            <span className="inline-flex items-center -space-x-4">
              {avatars?.map((avatar, i) => (
                <Avatar key={i} className="size-12 border-border border">
                  <Media
                    resource={avatar.avatar}
                    className="h-full w-full object-cover"
                    imgClassName="h-full w-full object-cover"
                  />
                </Avatar>
              ))}
            </span>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-left font-medium text-muted-foreground">
                from {reviewCount} reviews
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
            {links?.map((linkGroup, index) => (
              <div key={index}>
                {Object.entries(linkGroup).map(
                  ([key, link]) =>
                    link &&
                    typeof link === 'object' && (
                      <CMSLink
                        key={key}
                        className="inline-flex w-full items-center sm:w-auto"
                        {...link}
                      />
                    ),
                )}
              </div>
            ))}
          </div>
        </ClientMotionDiv>

        {image && (
          <ClientMotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex w-full h-full max-h-[600px] lg:max-h-[800px]"
          >
            <Media
              resource={image}
              className=" w-full h-full rounded-md "
              imgClassName="rounded-md object-cover w-full h-full"
            />
          </ClientMotionDiv>
        )}
      </div>
    </section>
  )
}
