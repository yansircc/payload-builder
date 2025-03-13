import { Media } from '@/components/Media'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { Testimonial6Fields } from '@/payload-types'

interface Testimonial6Props extends Testimonial6Fields {
  hideAuthorImages?: boolean
}
export default function Testimonial6({ testimonials, title, hideAuthorImages }: Testimonial6Props) {
  return (
    <section className="py-32">
      <div className="container">
        <Carousel className="w-full">
          <div className="mb-8 flex justify-between px-1 lg:mb-12">
            <h2 className="text-2xl font-semibold lg:text-5xl">{title}</h2>
            <div className="flex items-center space-x-2">
              <CarouselPrevious className="static translate-y-0 text-foreground" />
              <CarouselNext className="static translate-y-0 text-foreground" />
            </div>
          </div>
          <CarouselContent>
            {testimonials?.map((testimonial, idx) => (
              <CarouselItem key={idx} className="basis-full md:basis-1/2 lg:basis-1/3">
                <div className="h-full p-1">
                  <div className="flex h-full flex-col justify-between rounded-lg border p-6">
                    <q className="leading-7 text-muted-foreground">{testimonial.quote}</q>
                    <div className="mt-6 flex gap-4 leading-5">
                      {!hideAuthorImages && (
                        <Avatar className="size-9 rounded-full ring-1 ring-input overflow-hidden">
                          {testimonial.authorImage ? (
                            <Media
                              resource={testimonial.authorImage}
                              imgClassName="aspect-square size-full object-cover object-center"
                              className="!block size-full"
                            />
                          ) : (
                            <AvatarImage
                              src="https://shadcnblocks.com/images/block/avatar-1.webp"
                              alt={testimonial.authorName}
                            />
                          )}
                        </Avatar>
                      )}
                      <div className="text-sm">
                        <p className="font-medium">{testimonial.authorName}</p>
                        {testimonial.authorRole && (
                          <p className="text-muted-foreground">{testimonial.authorRole}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
