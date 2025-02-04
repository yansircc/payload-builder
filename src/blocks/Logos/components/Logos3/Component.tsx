'use client'

import AutoScroll from 'embla-carousel-auto-scroll'
import { Media } from '@/components/Media'
import type { Logos3Fields } from '@/payload-types'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { ClientMotionDiv } from '../shared/motion'

export default function Logos3({ logos }: Logos3Fields) {
  const { title, logos: logoItems } = logos

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container flex flex-col items-center text-center">
        {title && (
          <ClientMotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="my-6 text-pretty text-2xl font-bold lg:text-4xl">{title}</h2>
          </ClientMotionDiv>
        )}
      </div>

      <div className="pt-10 md:pt-16 lg:pt-20">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
          <Carousel opts={{ loop: true }} plugins={[AutoScroll({ playOnInit: true })]}>
            <CarouselContent className="ml-0">
              {logoItems?.map((item, index) => (
                <CarouselItem
                  key={item.id || index}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <ClientMotionDiv
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="mx-10 flex shrink-0 items-center justify-center"
                  >
                    <div>
                      <Media
                        resource={item.logo}
                        alt={typeof item.logo === 'string' ? item.logo : item.logo?.alt || 'Logo'}
                        className="max-h-12 max-w-[120px] object-contain object-center"
                        size="thumbnail"
                      />
                    </div>
                  </ClientMotionDiv>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  )
}
