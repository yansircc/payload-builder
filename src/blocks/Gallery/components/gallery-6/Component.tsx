import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { CarouselItem } from '@/components/ui/carousel'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Gallery6Fields } from '@/payload-types'
import { CarouselWrapper, CarouselControls } from './CarouselWrapper'
import { ClientMotionDiv } from '../shared/motion'

export default function Gallery6({ gallery }: Gallery6Fields) {
  const { heading, galleryLink: link, galleryCard: cards } = gallery
  if (!cards?.length) return null

  const header = (
    <div className="container">
      <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
        <ClientMotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6">{heading}</h2>
          <CMSLink
            className="group flex items-center gap-1 text-sm font-medium md:text-base lg:text-lg"
            label={link.label || 'Book a demo'}
            url={link.url || '#'}
            appearance="inline"
          >
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" />
          </CMSLink>
        </ClientMotionDiv>
        <ClientMotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2 md:mt-0">
            <CarouselControls />
          </div>
        </ClientMotionDiv>
      </div>
    </div>
  )

  return (
    <section className="py-32">
      <CarouselWrapper header={header}>
        {cards.map((card, index) => (
          <CarouselItem key={card.id} className="pl-[20px] md:max-w-[452px]">
            <ClientMotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group flex flex-col justify-between">
                <div>
                  <div className="flex aspect-[3/2] overflow-clip rounded-xl">
                    <div className="flex-1">
                      <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                        <Media
                          resource={card.image}
                          fill
                          className="h-full w-full"
                          imgClassName="object-cover object-center"
                          htmlElement="div"
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
                <CMSLink
                  {...card.link}
                  className="flex items-center text-sm"
                  appearance="inline"
                  label={card.link.label || 'Read more'}
                >
                  <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                </CMSLink>
              </div>
            </ClientMotionDiv>
          </CarouselItem>
        ))}
      </CarouselWrapper>
    </section>
  )
}
