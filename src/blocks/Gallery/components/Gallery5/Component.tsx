'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { Gallery5Fields, Media as MediaType } from '@/payload-types'

type Gallery5Props = {
  gallery: Gallery5Fields['gallery']
}

interface GalleryItem {
  id?: string | null
  title: string
  description: string
  image: string | MediaType
  href: string
}

export default function Gallery5({ gallery }: Gallery5Props) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [selection, setSelection] = useState(0)

  const { title, description, links = [], items } = gallery
  const link = links?.[0]?.link

  useEffect(() => {
    if (!carouselApi) {
      return
    }
    carouselApi.scrollTo(selection)
  }, [carouselApi, selection])

  useEffect(() => {
    if (!carouselApi) {
      return
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
      setSelection(carouselApi.selectedScrollSnap())
    }
    updateSelection()
    carouselApi.on('select', updateSelection)
    return () => {
      carouselApi.off('select', updateSelection)
    }
  }, [carouselApi])

  if (!items?.length) return null

  const currentItem = items[selection]

  return (
    <section className="py-32">
      <div className="container mb-14 flex flex-col gap-16 lg:mb-16 lg:px-16">
        <div className="lg:max-w-lg">
          {title && (
            <h2 className="mb-3 text-xl font-semibold md:mb-4 md:text-4xl lg:mb-6">{title}</h2>
          )}
          {description && <p className="mb-8 text-muted-foreground lg:text-lg">{description}</p>}
          {link?.label && (
            <CMSLink
              {...link}
              appearance="inline"
              className="group flex items-center text-xs font-medium md:text-base lg:text-lg"
            />
          )}
        </div>
        <div className="flex shrink-0 justify-center gap-2 md:hidden">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              carouselApi?.scrollPrev()
            }}
            disabled={!canScrollPrev}
            className="disabled:pointer-events-auto"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              carouselApi?.scrollNext()
            }}
            disabled={!canScrollNext}
            className="disabled:pointer-events-auto"
          >
            <ArrowRight className="size-5" />
          </Button>
        </div>
        <div className="hidden items-center justify-center space-x-4 space-y-4 text-center md:flex md:flex-wrap">
          <ToggleGroup
            type="single"
            variant="outline"
            size="lg"
            className="flex-wrap gap-4"
            value={currentItem?.id || ''}
            onValueChange={(newValue: string) => {
              if (newValue) {
                setSelection(items.findIndex((item: GalleryItem) => item.id === newValue))
              }
            }}
          >
            {items.map((item: GalleryItem) => (
              <ToggleGroupItem key={item.id} value={item.id || ''}>
                {item.title}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
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
          <CarouselContent className="ml-[calc(theme(container.padding)-40px)] mr-[calc(theme(container.padding))] lg:ml-[calc(200px-40px)] lg:mr-[200px] 2xl:ml-[calc(50vw-700px+200px-40px)] 2xl:mr-[calc(50vw-700px+200px)]">
            {items.map((item: GalleryItem) => (
              <CarouselItem key={item.id} className="pl-[40px]">
                <a href={item.href} className="group rounded-xl">
                  <div className="flex flex-col overflow-clip rounded-xl border border-border md:col-span-2 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
                    <div className="md:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem]">
                      <Media
                        resource={item.image}
                        className="aspect-[16/9] h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="flex flex-col justify-center px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
                      <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground lg:text-lg">{item.description}</p>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
