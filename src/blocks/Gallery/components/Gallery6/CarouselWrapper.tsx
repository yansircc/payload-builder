'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselApi, CarouselContent } from '@/components/ui/carousel'

interface CarouselWrapperProps {
  children: React.ReactNode
  header?: React.ReactNode
}

interface CarouselContextType {
  api: CarouselApi | null
  canScrollPrev: boolean
  canScrollNext: boolean
}

const CarouselContext = createContext<CarouselContextType>({
  api: null,
  canScrollPrev: false,
  canScrollNext: false,
})

export function CarouselControls() {
  const { api, canScrollPrev, canScrollNext } = useContext(CarouselContext)

  if (!api) return null

  return (
    <div className="flex shrink-0 items-center justify-start gap-2">
      <Button
        size="icon"
        variant="outline"
        onClick={() => api.scrollPrev()}
        disabled={!canScrollPrev}
        className="disabled:pointer-events-auto"
      >
        <ArrowLeft className="size-5" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        onClick={() => api.scrollNext()}
        disabled={!canScrollNext}
        className="disabled:pointer-events-auto"
      >
        <ArrowRight className="size-5" />
      </Button>
    </div>
  )
}

export function CarouselWrapper({ children, header }: CarouselWrapperProps) {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    if (!api) return

    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())

    api.on('select', () => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    })
  }, [api])

  return (
    <CarouselContext.Provider
      value={{
        api,
        canScrollPrev,
        canScrollNext,
      }}
    >
      {header}
      <div className="w-full">
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            breakpoints: {
              '(max-width: 768px)': {
                dragFree: true,
              },
            },
          }}
          className="w-full"
        >
          <CarouselContent className="ml-[calc(theme(container.padding)-20px)] mr-[calc(theme(container.padding))] 2xl:ml-[calc(50vw-700px+theme(container.padding)-20px)] 2xl:mr-[calc(50vw-700px+theme(container.padding))]">
            {children}
          </CarouselContent>
        </Carousel>
      </div>
    </CarouselContext.Provider>
  )
}
