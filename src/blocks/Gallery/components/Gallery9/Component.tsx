'use client'

import { useEffect, useState } from 'react'
import { DynamicIcon } from '@/components/DynamicIcon'
import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import type { Gallery9Fields } from '@/payload-types'

export default function Gallery9({ gallery }: { gallery: Gallery9Fields['gallery'] }) {
  const { title, description, sections } = gallery
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const scrollToSection = (index: number) => {
    api?.scrollTo(index)
  }

  if (!sections?.length) return null

  return (
    <section className="py-32">
      <div className="container">
        <div className="mb-20 flex flex-col items-center justify-center gap-8">
          {title && <h1 className="text-4xl">{title}</h1>}
          {description && (
            <Badge variant="secondary" className="px-5 py-2 text-base font-normal">
              {description}
            </Badge>
          )}
        </div>
        <Carousel setApi={setApi} className="flex flex-col gap-10">
          <CarouselContent>
            {sections.map((item, index) => (
              <CarouselItem className="h-full w-full" key={item.id ?? index}>
                <Media
                  resource={item.image}
                  className="aspect-square h-full w-full object-cover md:aspect-[2]"
                  imgClassName="object-cover"
                />
                <div className="mt-8 flex cursor-pointer flex-col gap-2 md:hidden">
                  <DynamicIcon name={item.icon} className="h-5 w-5" />
                  <div className="text-lg font-medium">{item.title}</div>
                  <div className="text-lg text-muted-foreground">{item.text}</div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mb-8 hidden justify-between gap-8 md:flex">
            {sections.map((section, index) => (
              <div
                key={section.id ?? index}
                onClick={() => scrollToSection(index)}
                className="flex cursor-pointer flex-col gap-2"
              >
                <DynamicIcon name={section.icon} className="h-5 w-5" />
                <div className="text-lg font-medium">{section.title}</div>
                <div
                  className={`text-lg ${
                    index + 1 === current ? 'text-muted-foreground' : 'text-muted-foreground/50'
                  } hover:text-muted-foreground`}
                >
                  {section.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-8">
            <div>
              {current} / {count}
            </div>
            <div className="flex items-center justify-start gap-2">
              <CarouselPrevious className="static translate-y-0" disabled={false} />
              <CarouselNext className="static translate-y-0" disabled={false} />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  )
}
