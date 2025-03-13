'use client'

import AutoScroll from 'embla-carousel-auto-scroll'
import { Star, Zap } from 'lucide-react'
import { useRef } from 'react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Avatar } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import type { Testimonial19Fields } from '@/payload-types'

interface Testimonial19Props extends Testimonial19Fields {
  hideAuthorImages?: boolean
}

export default function Testimonial19({
  heading,
  subheading,
  statsText,
  viewAll,
  testimonials,
  hideAuthorImages,
}: Testimonial19Props) {
  const plugin = useRef(
    AutoScroll({
      startDelay: 500,
      speed: 0.7,
    }),
  )

  return (
    <section className="py-32">
      <div className="container flex flex-col items-center gap-4">
        <div className="flex items-center gap-1 text-sm font-semibold">
          <Zap className="h-6 w-auto fill-primary" />
          {statsText}
        </div>
        <h2 className="text-center text-3xl font-semibold lg:text-4xl">{heading}</h2>
        <p className="text-center text-muted-foreground lg:text-lg">{subheading}</p>
        {viewAll && (
          <CMSLink
            {...viewAll}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          />
        )}
      </div>
      <div className="lg:container">
        <div className="mt-16 space-y-4">
          <Carousel
            opts={{
              loop: true,
            }}
            plugins={[plugin.current]}
            onMouseLeave={() => plugin.current.play()}
            className="relative before:absolute before:bottom-0 before:left-0 before:top-0 before:z-10 before:w-36 before:bg-gradient-to-r before:from-background before:to-transparent after:absolute after:bottom-0 after:right-0 after:top-0 after:z-10 after:w-36 after:bg-gradient-to-l after:from-background after:to-transparent"
          >
            <CarouselContent>
              {testimonials?.map((testimonial, index: number) => (
                <CarouselItem key={index} className="basis-auto">
                  <Card className="w-[400px] h-[220px] select-none p-8">
                    <div className="flex justify-between mb-8">
                      <div className="flex gap-4">
                        {!hideAuthorImages && (
                          <Avatar className="size-14 rounded-full ring-1 ring-input overflow-hidden flex-shrink-0">
                            {testimonial.authorImage && (
                              <Media
                                resource={testimonial.authorImage}
                                imgClassName="aspect-square size-full object-cover object-center"
                                className="!block size-full"
                              />
                            )}
                          </Avatar>
                        )}
                        <div className="min-w-0 max-w-[180px] pt-1">
                          <p className="font-medium text-foreground truncate">
                            {testimonial.authorName}
                          </p>
                          <p className="text-sm text-foreground truncate">
                            {testimonial.authorRole}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-0.5 flex-shrink-0">
                        {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                          <Star key={i} className="size-3.5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                    </div>
                    <div className="max-h-[84px] overflow-hidden">
                      <q className="leading-7 text-foreground line-clamp-3 block text-ellipsis">
                        {testimonial.quote}
                      </q>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
