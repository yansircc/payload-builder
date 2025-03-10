'use client'

import AutoScroll from 'embla-carousel-auto-scroll'
import { useRef } from 'react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import type { Testimonial7Fields } from '@/payload-types'

interface Testimonial7Props extends Testimonial7Fields {
  hideAuthorImages?: boolean
}

export default function Testimonial7({
  testimonials,
  title,
  description,
  cta,
  hideAuthorImages,
}: Testimonial7Props) {
  const testimonials1 = testimonials?.slice(0, Math.ceil(testimonials?.length / 2)) ?? []
  const testimonials2 = testimonials?.slice(Math.ceil(testimonials?.length / 2)) ?? []

  const plugin1 = useRef(
    AutoScroll({
      startDelay: 500,
      speed: 0.7,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  )

  const plugin2 = useRef(
    AutoScroll({
      startDelay: 500,
      speed: 0.7,
      direction: 'backward',
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  )

  const shouldShowCarousel1 = testimonials1.length > 3
  const shouldShowCarousel2 = testimonials2.length > 3

  return (
    <section className="py-32">
      <div className="container flex flex-col items-center gap-6">
        <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">{title}</h2>
        <p className="text-muted-foreground lg:text-lg">{description}</p>
        {cta && <CMSLink className="mt-6" {...cta} />}
      </div>
      <div className="container">
        <div className="mt-16 space-y-4">
          {shouldShowCarousel1 ? (
            <Carousel
              opts={{
                loop: true,
                align: 'center',
                containScroll: 'trimSnaps',
              }}
              plugins={[plugin1.current]}
              onMouseLeave={() => plugin1.current.play()}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {testimonials1.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="mx-auto max-w-96 min-h-[200px] h-full select-none p-6 flex flex-col">
                      <div className="mb-4 flex gap-4">
                        {!hideAuthorImages && (
                          <Avatar className="size-9 flex-shrink-0 rounded-full ring-1 ring-input overflow-hidden">
                            {testimonial.authorImage ? (
                              <Media
                                resource={testimonial.authorImage}
                                imgClassName="aspect-square size-full object-cover object-center"
                                className="!block size-full"
                              />
                            ) : (
                              <AvatarImage
                                src="https://shadcnblocks.com/images/block/avatar-1.webp"
                                alt={testimonial.authorName}
                              />
                            )}
                          </Avatar>
                        )}
                        <div className="text-sm">
                          <p className="font-medium text-foreground">{testimonial.authorName}</p>
                          {testimonial.authorRole && (
                            <p className="text-foreground">{testimonial.authorRole}</p>
                          )}
                        </div>
                      </div>
                      <q className="text-foreground line-clamp-3">{testimonial.quote}</q>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <div className="flex justify-center gap-4 flex-wrap">
              {testimonials1.map((testimonial, index) => (
                <Card key={index} className="w-[400px] h-[200px] select-none p-6 flex flex-col">
                  <div className="mb-4 flex gap-4">
                    {!hideAuthorImages && (
                      <Avatar className="size-9 flex-shrink-0 rounded-full ring-1 ring-input overflow-hidden">
                        {testimonial.authorImage ? (
                          <Media
                            resource={testimonial.authorImage}
                            imgClassName="aspect-square size-full object-cover object-center"
                            className="!block size-full"
                          />
                        ) : (
                          <AvatarImage
                            src="https://shadcnblocks.com/images/block/avatar-1.webp"
                            alt={testimonial.authorName}
                          />
                        )}
                      </Avatar>
                    )}
                    <div className="text-sm">
                      <p className="font-medium text-foreground">{testimonial.authorName}</p>
                      {testimonial.authorRole && (
                        <p className="text-foreground">{testimonial.authorRole}</p>
                      )}
                    </div>
                  </div>
                  <q className="text-foreground line-clamp-4">{testimonial.quote}</q>
                </Card>
              ))}
            </div>
          )}

          {shouldShowCarousel2 ? (
            <Carousel
              opts={{
                loop: true,
                align: 'center',
                containScroll: 'trimSnaps',
              }}
              plugins={[plugin2.current]}
              onMouseLeave={() => plugin2.current.play()}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {testimonials2.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="mx-auto max-w-96 h-[200px] select-none p-6 flex flex-col">
                      <div className="mb-4 flex gap-4">
                        {!hideAuthorImages && (
                          <Avatar className="size-9 flex-shrink-0 rounded-full ring-1 ring-input overflow-hidden">
                            {testimonial.authorImage ? (
                              <Media
                                resource={testimonial.authorImage}
                                imgClassName="aspect-square size-full object-cover object-center"
                                className="!block size-full"
                              />
                            ) : (
                              <AvatarImage
                                src="https://shadcnblocks.com/images/block/avatar-1.webp"
                                alt={testimonial.authorName}
                              />
                            )}
                          </Avatar>
                        )}
                        <div className="text-sm">
                          <p className="font-medium text-foreground">{testimonial.authorName}</p>
                          {testimonial.authorRole && (
                            <p className="text-foreground">{testimonial.authorRole}</p>
                          )}
                        </div>
                      </div>
                      <q className="text-foreground line-clamp-3">{testimonial.quote}</q>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <div className="flex justify-center gap-4 flex-wrap">
              {testimonials2.map((testimonial, index) => (
                <Card key={index} className="w-[400px] h-[200px] select-none p-6 flex flex-col">
                  <div className="mb-4 flex gap-4">
                    {!hideAuthorImages && (
                      <Avatar className="size-9 flex-shrink-0 rounded-full ring-1 ring-input overflow-hidden">
                        {testimonial.authorImage ? (
                          <Media
                            resource={testimonial.authorImage}
                            imgClassName="aspect-square size-full object-cover object-center"
                            className="!block size-full"
                          />
                        ) : (
                          <AvatarImage
                            src="https://shadcnblocks.com/images/block/avatar-1.webp"
                            alt={testimonial.authorName}
                          />
                        )}
                      </Avatar>
                    )}
                    <div className="text-sm">
                      <p className="font-medium text-foreground">{testimonial.authorName}</p>
                      {testimonial.authorRole && (
                        <p className="text-foreground">{testimonial.authorRole}</p>
                      )}
                    </div>
                  </div>
                  <q className="text-foreground line-clamp-3">{testimonial.quote}</q>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
