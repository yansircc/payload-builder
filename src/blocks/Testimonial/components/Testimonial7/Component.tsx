'use client'

import AutoScroll from 'embla-carousel-auto-scroll'
import { useRef } from 'react'
import type { Testimonial7Fields } from '@/payload-types'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Media as MediaComponent } from '@/components/Media'
import { CMSLink } from '@/components/Link'

export default function Testimonial7({
  testimonials,
  title = 'Meet our happy clients',
  description = 'All of our 1000+ clients are happy',
  cta,
}: Testimonial7Fields) {
  // Split testimonials into two arrays for different scroll directions
  const testimonials1 = testimonials?.slice(0, Math.ceil(testimonials?.length / 2)) ?? []
  const testimonials2 = testimonials?.slice(Math.ceil(testimonials?.length / 2)) ?? []

  const plugin1 = useRef(
    AutoScroll({
      startDelay: 500,
      speed: 0.7,
    }),
  )

  const plugin2 = useRef(
    AutoScroll({
      startDelay: 500,
      speed: 0.7,
      direction: 'backward',
    }),
  )

  return (
    <section className="py-32">
      <div className="container flex flex-col items-center gap-6">
        <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">{title}</h2>
        <p className="text-muted-foreground lg:text-lg">{description}</p>
        {cta && <CMSLink className="mt-6" appearance="default" {...cta} />}
      </div>
      <div className="lg:container">
        <div className="mt-16 space-y-4">
          <Carousel
            opts={{
              loop: true,
            }}
            plugins={[plugin1.current]}
            onMouseLeave={() => plugin1.current.play()}
          >
            <CarouselContent>
              {testimonials1.map((testimonial, index) => (
                <CarouselItem key={index} className="basis-auto">
                  <Card className="max-w-96 select-none p-6">
                    <div className="mb-4 flex gap-4">
                      <Avatar className="size-9 rounded-full ring-1 ring-input">
                        {testimonial.authorImage ? (
                          <MediaComponent
                            resource={testimonial.authorImage}
                            className="size-full object-cover"
                          />
                        ) : (
                          <AvatarImage
                            src="https://shadcnblocks.com/images/block/avatar-1.webp"
                            alt={testimonial.authorName}
                          />
                        )}
                      </Avatar>
                      <div className="text-sm">
                        <p className="font-medium">{testimonial.authorName}</p>
                        {testimonial.authorRole && (
                          <p className="text-muted-foreground">{testimonial.authorRole}</p>
                        )}
                      </div>
                    </div>
                    <q>{testimonial.quote}</q>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <Carousel
            opts={{
              loop: true,
            }}
            plugins={[plugin2.current]}
            onMouseLeave={() => plugin2.current.play()}
          >
            <CarouselContent>
              {testimonials2.map((testimonial, index) => (
                <CarouselItem key={index} className="basis-auto">
                  <Card className="max-w-96 select-none p-6">
                    <div className="mb-4 flex gap-4">
                      <Avatar className="size-9 rounded-full ring-1 ring-input">
                        {testimonial.authorImage ? (
                          <MediaComponent
                            resource={testimonial.authorImage}
                            className="size-full object-cover"
                          />
                        ) : (
                          <AvatarImage
                            src="https://shadcnblocks.com/images/block/avatar-1.webp"
                            alt={testimonial.authorName}
                          />
                        )}
                      </Avatar>
                      <div className="text-sm">
                        <p className="font-medium">{testimonial.authorName}</p>
                        {testimonial.authorRole && (
                          <p className="text-muted-foreground">{testimonial.authorRole}</p>
                        )}
                      </div>
                    </div>
                    <q>{testimonial.quote}</q>
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
