'use client'

import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Page } from '@/payload-types'

type GalleryBlock = Extract<Page['layout'][number], { blockType: 'gallery' }>
type Gallery6Data = NonNullable<GalleryBlock['gallery-6']>

export default function Gallery6({ cards }: Gallery6Data) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    if (!carouselApi) return

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
    }

    updateSelection()
    carouselApi.on('select', updateSelection)
    return () => {
      carouselApi.off('select', updateSelection)
    }
  }, [carouselApi])

  if (!cards?.length) return null

  return (
    <section className="py-32">
      <div className="container">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div>
            <h2 className="mb-3 text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6">Gallery</h2>
            <CMSLink
              className="group flex items-center gap-1 text-sm font-medium md:text-base lg:text-lg"
              label="Book a demo"
              url="#"
            >
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" />
            </CMSLink>
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              '(max-width: 768px)': {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-[calc(theme(container.padding)-20px)] mr-[calc(theme(container.padding))] 2xl:ml-[calc(50vw-700px+theme(container.padding)-20px)] 2xl:mr-[calc(50vw-700px+theme(container.padding))]">
            {cards.map((card) => (
              <CarouselItem key={card.id} className="pl-[20px] md:max-w-[452px]">
                <CMSLink {...card.link} className="group flex flex-col justify-between">
                  <div>
                    <div className="flex aspect-[3/2] overflow-clip rounded-xl">
                      <div className="flex-1">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          <Media
                            resource={card.image}
                            className="h-full w-full object-cover object-center"
                            fill
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
                    {card.title}
                  </div>
                  <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
                    {card.excerpt}
                  </div>
                  <div className="flex items-center text-sm">
                    Read more{' '}
                    <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </CMSLink>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
