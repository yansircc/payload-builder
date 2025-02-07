'use client'

import Fade from 'embla-carousel-fade'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Contact4Fields } from '@/payload-types'

export default function Contact4({ contact }: Contact4Fields) {
  const { title, subtitle, supportList, locationList } = contact

  return (
    <section className="py-32">
      <div className="container">
        <div className="max-w-screen-sm">
          <h1 className="mb-3 text-xl font-medium text-muted-foreground">{subtitle}</h1>
          <p className="text-balance text-4xl font-medium md:text-5xl">{title}</p>
        </div>

        <div className="mt-10 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-8">
          {supportList?.supports?.map((support, idx) => (
            <div key={idx} className="flex flex-col justify-between gap-6 rounded-lg border p-6">
              <div>
                <h2 className="mb-4 text-xl font-medium md:text-2xl">{support.title}</h2>
                <p className="text-muted-foreground">{support.subtitle}</p>
              </div>
              {support.link && <CMSLink {...support.link} className="hover:underline w-fit" />}
            </div>
          ))}
        </div>

        <div className="mt-7">
          <Carousel
            plugins={[Fade()]}
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {locationList?.locations?.map((location, idx) => (
                <CarouselItem key={idx}>
                  <div className="relative flex h-full flex-col overflow-hidden rounded-t-lg md:max-h-[496px] md:rounded-lg">
                    {location.image && (
                      <Media
                        resource={location.image}
                        className="h-full w-full rounded-t-lg object-cover md:rounded-lg"
                      />
                    )}
                    <div className="bottom-8 left-8 flex flex-col justify-between gap-6 rounded-b-lg border-x border-b bg-background p-6 md:absolute md:max-w-96 md:rounded-lg md:border">
                      <div>
                        <h2 className="mb-4 text-xl font-medium md:text-2xl">{location.title}</h2>
                        <p className="text-muted-foreground">{location.subtitle}</p>
                      </div>
                      {location.link && (
                        <CMSLink {...location.link} className="hover:underline w-fit" />
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute bottom-2 right-6 flex gap-4 md:bottom-5 md:right-10">
              <CarouselPrevious className="static" />
              <CarouselNext className="static" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
