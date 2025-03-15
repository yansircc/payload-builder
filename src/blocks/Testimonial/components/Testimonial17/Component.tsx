'use client'

import { useEffect, useState } from 'react'
import { Media } from '@/components/Media'
import { Avatar } from '@/components/ui/avatar'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import type { Testimonial17Fields } from '@/payload-types'
import { cn } from '@/utilities/ui'

const LogoWrapper = ({
  logo,
  logoAlt,
}: Pick<NonNullable<Testimonial17Fields['testimonials']>[number], 'logo' | 'logoAlt'>) => {
  return (
    <div className="mb-8 flex items-center justify-start">
      <div className="relative h-10 w-[120px]">
        <Media
          resource={logo}
          alt={logoAlt}
          className="!h-10 !w-auto !object-contain !object-left"
          imgClassName="!h-10 !w-auto !object-contain !object-left"
        />
      </div>
    </div>
  )
}

interface Testimonial17Props extends Testimonial17Fields {
  hideAuthorImages?: boolean
}

export default function Testimonial17({
  heading,
  testimonials,
  hideAuthorImages,
}: Testimonial17Props) {
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
              {testimonials?.map((testimonial, index: number) => (
                <CarouselItem key={index}>
                  <div className="select-none rounded-2xl border p-8">
                    <LogoWrapper logo={testimonial.logo} logoAlt={testimonial.logoAlt} />
                    <p className="mb-10 text-xl font-semibold">{testimonial.quote}</p>
                    <div className="mb-3 flex gap-4">
                      {!hideAuthorImages && (
                        <Avatar className="size-12 rounded-full ring-1 ring-input overflow-hidden">
                          {testimonial.authorImage && (
                            <Media
                              resource={testimonial.authorImage}
                              imgClassName="aspect-square size-full object-cover object-center"
                              className="!block size-full"
                            />
                          )}
                        </Avatar>
                      )}
                      <div>
                        <p className="font-medium">{testimonial.authorName}</p>
                        <p className="text-muted-foreground">{testimonial.authorRole}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {count > 1 && (
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
            )}
          </Carousel>
          <div className="col-span-2 hidden grid-cols-2 items-center gap-6 lg:grid">
            <div className="rounded-2xl border p-8">
              {testimonials?.[0] && (
                <>
                  <LogoWrapper logo={testimonials[0].logo} logoAlt={testimonials[0].logoAlt} />
                  <p className="mb-10 text-xl font-semibold">{testimonials[0].quote}</p>
                  <div className="mb-3 flex gap-4">
                    {!hideAuthorImages && testimonials[0].authorImage && (
                      <Avatar className="size-12 rounded-full ring-1 ring-input overflow-hidden">
                        <Media
                          resource={testimonials[0].authorImage}
                          imgClassName="aspect-square size-full object-cover object-center"
                          className="!block size-full"
                        />
                      </Avatar>
                    )}
                    <div>
                      <p className="font-medium">{testimonials[0].authorName}</p>
                      <p className="text-muted-foreground">{testimonials[0].authorRole}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-col gap-6">
              {testimonials?.slice(1).map((testimonial, index: number) => (
                <div key={index} className="rounded-2xl border p-8">
                  <LogoWrapper logo={testimonial.logo} logoAlt={testimonial.logoAlt} />
                  <p className="mb-10 text-xl font-semibold">{testimonial.quote}</p>
                  <div className="mb-3 flex gap-4">
                    {!hideAuthorImages && testimonial.authorImage && (
                      <Avatar className="size-12 rounded-full ring-1 ring-input overflow-hidden">
                        <Media
                          resource={testimonial.authorImage}
                          imgClassName="aspect-square size-full object-cover object-center"
                          className="!block size-full"
                        />
                      </Avatar>
                    )}
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
