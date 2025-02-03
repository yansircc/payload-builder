'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useReducer } from 'react'

import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import type { Gallery4Fields } from '@/payload-types'

interface Props {
  gallery: Gallery4Fields['gallery']
}

interface GalleryItem {
  id?: string | null
  title: string
  description: string
  href: string
  image: any
}

interface CarouselState {
  carouselApi: CarouselApi | undefined
  canScrollPrev: boolean
  canScrollNext: boolean
}

type CarouselAction =
  | { type: 'SET_API'; payload: CarouselApi }
  | { type: 'UPDATE_NAVIGATION'; payload: { canScrollPrev: boolean; canScrollNext: boolean } }

function carouselReducer(state: CarouselState, action: CarouselAction): CarouselState {
  switch (action.type) {
    case 'SET_API':
      return {
        ...state,
        carouselApi: action.payload,
      }
    case 'UPDATE_NAVIGATION':
      return {
        ...state,
        canScrollPrev: action.payload.canScrollPrev,
        canScrollNext: action.payload.canScrollNext,
      }
    default:
      return state
  }
}

export default function Gallery4({ gallery }: Props) {
  const [state, dispatch] = useReducer(carouselReducer, {
    carouselApi: undefined,
    canScrollPrev: false,
    canScrollNext: false,
  })

  const { carouselApi, canScrollPrev, canScrollNext } = state

  useEffect(() => {
    if (!carouselApi) return

    const updateSelection = () => {
      dispatch({
        type: 'UPDATE_NAVIGATION',
        payload: {
          canScrollPrev: carouselApi.canScrollPrev(),
          canScrollNext: carouselApi.canScrollNext(),
        },
      })
    }

    updateSelection()
    carouselApi.on('select', updateSelection)
    return () => {
      carouselApi.off('select', updateSelection)
    }
  }, [carouselApi])

  if (!gallery?.items?.length) return null

  return (
    <section className="py-32">
      <div className="container">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">{gallery.title}</h2>
          <div className="hidden shrink-0 gap-2 md:flex">
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
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={(api) => dispatch({ type: 'SET_API', payload: api })}
          opts={{
            breakpoints: {
              '(max-width: 768px)': {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-[calc(theme(container.padding)-20px)] mr-[calc(theme(container.padding))] 2xl:ml-[calc(50vw-700px+theme(container.padding)-20px)] 2xl:mr-[calc(50vw-700px+theme(container.padding))]">
            {gallery.items?.map((item: GalleryItem) => (
              <CarouselItem key={item.id} className="max-w-[320px] pl-[20px] lg:max-w-[360px]">
                <a href={item.href} className="group rounded-xl">
                  <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl bg-red-200 md:aspect-[5/4] lg:aspect-[16/9]">
                    <Media
                      resource={item.image}
                      className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 h-full bg-[linear-gradient(hsl(var(--primary)/0.2),hsl(var(--primary)/0.8)_100%)] mix-blend-multiply" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-primary-foreground md:p-8">
                      <div className="mb-2 pt-4 text-xl font-semibold md:mb-3 md:pt-4 lg:pt-4">
                        {item.title}
                      </div>
                      <div className="mb-8 line-clamp-2 md:mb-12 lg:mb-9">{item.description}</div>
                      <div className="flex items-center text-sm">
                        Read more{' '}
                        <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                      </div>
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
