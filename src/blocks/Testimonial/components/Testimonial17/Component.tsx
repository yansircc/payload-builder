'use client'

import { useEffect, useState } from 'react'
import type { Media, TestimonialBlock } from '@/payload-types'

import { Avatar } from '@/components/ui/avatar'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Media as MediaComponent } from '@/components/Media'
import { cn } from '@/utilities/ui'

type TestimonialItem = {
  logo: Media | string
  logoAlt: string
  quote: string
  authorName: string
  authorRole?: string | null
  authorImage?: Media | string | null
}

type Props = NonNullable<TestimonialBlock['testimonial-17']>

const LogoWrapper = ({
  logo,
  logoAlt,
  size = 'medium',
}: {
  logo: Media | string
  logoAlt: string
  size?: 'small' | 'medium' | 'large'
}) => {
  const sizeClasses = {
    small: 'h-5',
    medium: 'h-8',
    large: 'h-10',
  }

  return (
    <div className={cn('mb-8 flex items-center justify-start', sizeClasses[size])}>
      <div className="relative h-full w-[120px]">
        <MediaComponent
          resource={logo}
          alt={logoAlt}
          className="absolute left-0 top-0 h-full w-auto object-contain object-left"
        />
      </div>
    </div>
  )
}

export default function Testimonial17({ heading, testimonials }: Props) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col gap-14 lg:grid lg:grid-cols-3 lg:gap-0">
          <h2 className="text-center text-3xl font-bold lg:text-left lg:text-4xl">{heading}</h2>
          <Carousel setApi={setApi} className="w-full lg:hidden">
            <CarouselContent>
              {testimonials?.map((testimonial: TestimonialItem, index: number) => (
                <CarouselItem key={index}>
                  <div className="select-none rounded-2xl border p-8">
                    <LogoWrapper logo={testimonial.logo} logoAlt={testimonial.logoAlt} />
                    <p className="mb-10 text-xl font-semibold">{testimonial.quote}</p>
                    <div className="mb-3 flex gap-4">
                      <Avatar className="size-12 rounded-full ring-1 ring-input">
                        {testimonial.authorImage && (
                          <MediaComponent
                            resource={testimonial.authorImage}
                            className="size-12 rounded-full object-cover"
                          />
                        )}
                      </Avatar>
                      <div>
                        <p className="font-medium">{testimonial.authorName}</p>
                        <p className="text-muted-foreground">{testimonial.authorRole}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-8 flex justify-center">
              {Array.from({ length: count }).map((_, index) => (
                <span
                  key={index}
                  className={cn(
                    'mx-2 inline-block size-3 cursor-pointer rounded-full border-2',
                    index + 1 === current && 'border-primary bg-primary',
                  )}
                  onClick={() => api && api.scrollTo(index)}
                />
              ))}
            </div>
          </Carousel>
          <div className="col-span-2 hidden grid-cols-2 items-center gap-6 lg:grid">
            <div className="rounded-2xl border p-8">
              {testimonials?.[0] && (
                <>
                  <LogoWrapper
                    logo={testimonials[0].logo}
                    logoAlt={testimonials[0].logoAlt}
                    size="large"
                  />
                  <p className="mb-10 text-xl font-semibold">{testimonials[0].quote}</p>
                  <div className="mb-3 flex gap-4">
                    <Avatar className="size-12 rounded-full ring-1 ring-input">
                      {testimonials[0].authorImage && (
                        <MediaComponent
                          resource={testimonials[0].authorImage}
                          className="size-12 rounded-full object-cover"
                        />
                      )}
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonials[0].authorName}</p>
                      <p className="text-muted-foreground">{testimonials[0].authorRole}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-col gap-6">
              {testimonials?.slice(1).map((testimonial: TestimonialItem, index: number) => (
                <div key={index} className="rounded-2xl border p-8">
                  <LogoWrapper
                    logo={testimonial.logo}
                    logoAlt={testimonial.logoAlt}
                    size={index === 0 ? 'medium' : 'small'}
                  />
                  <p className="mb-10 text-xl font-semibold">{testimonial.quote}</p>
                  <div className="mb-3 flex gap-4">
                    <Avatar className="size-12 rounded-full ring-1 ring-input">
                      {testimonial.authorImage && (
                        <MediaComponent
                          resource={testimonial.authorImage}
                          className="size-12 rounded-full object-cover"
                        />
                      )}
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.authorName}</p>
                      <p className="text-muted-foreground">{testimonial.authorRole}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
