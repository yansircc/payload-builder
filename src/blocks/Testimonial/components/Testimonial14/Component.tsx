'use client'

import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { TestimonialBlock } from '@/payload-types'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Media } from '@/components/Media'

type TestimonialItem = NonNullable<
  NonNullable<TestimonialBlock['testimonial-14']>['testimonials']
>[number]

interface Testimonial14Props {
  testimonials: TestimonialItem[]
}

export default function Testimonial14({ testimonials }: Testimonial14Props) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on('select', updateCurrent)
    return () => {
      api.off('select', updateCurrent)
    }
  }, [api])

  if (!testimonials?.length) {
    return null
  }

  return (
    <section className="py-32">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {testimonials.map((item, index) => (
            <CarouselItem key={index}>
              <div className="container flex flex-col items-center text-center">
                <p className="mb-8 max-w-4xl font-medium md:px-8 lg:text-3xl">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <Avatar className="mb-2 size-12 md:size-24">
                  {item.authorImage ? (
                    <Media resource={item.authorImage} className="size-full object-cover" />
                  ) : (
                    <AvatarFallback>{item.authorName?.[0]}</AvatarFallback>
                  )}
                </Avatar>
                <p className="mb-1 text-sm font-medium md:text-lg">{item.authorName}</p>
                {item.authorRole && (
                  <p className="mb-2 text-sm text-muted-foreground md:text-lg">{item.authorRole}</p>
                )}
                {item.rating && (
                  <div className="mt-2 flex items-center gap-0.5">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="size-5 fill-primary stroke-none" />
                    ))}
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="container flex justify-center py-16">
        {testimonials.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => {
              api?.scrollTo(index)
            }}
          >
            <div
              className={`size-2.5 rounded-full ${index === current ? 'bg-primary' : 'bg-input'}`}
            />
          </Button>
        ))}
      </div>
    </section>
  )
}
