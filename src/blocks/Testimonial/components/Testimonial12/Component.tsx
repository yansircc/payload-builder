import { Media } from '@/components/Media'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import type { Testimonial12Fields } from '@/payload-types'

export default function Testimonial12({ testimonials }: Testimonial12Fields) {
  return (
    <section className="py-32">
      <div className="container">
        <div className="relative rounded-2xl bg-muted">
          <Carousel className="static">
            <CarouselContent className="-ml-4">
              {testimonials?.map((testimonial, index: number) => (
                <CarouselItem
                  key={index}
                  className="grid grid-cols-1 gap-y-10 pb-14 pl-8 pr-4 pt-4 sm:pt-8 lg:grid-cols-3 lg:gap-10 lg:p-20"
                >
                  <div>
                    {testimonial.authorImage && (
                      <Media
                        resource={testimonial.authorImage}
                        className="mx-auto max-h-80 rounded-xl lg:mx-0 lg:max-h-none"
                        imgClassName="object-cover"
                      />
                    )}
                    <div className="mt-4 text-center">
                      <h3 className="font-semibold">{testimonial.authorName}</h3>
                      <p className="text-muted-foreground">{testimonial.authorRole}</p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="mb-6 flex items-center justify-center gap-2 lg:mb-8 lg:justify-start">
                      {testimonial.companyLogo && (
                        <Media
                          resource={testimonial.companyLogo}
                          className="h-auto w-7 lg:w-11"
                          imgClassName="object-contain"
                        />
                      )}
                      <span className="text-xl font-semibold lg:text-3xl">
                        {testimonial.companyName}
                      </span>
                    </div>
                    <p className="text-center text-xl font-semibold lg:text-left lg:text-2xl">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <Separator className="my-8 lg:my-10" />
                    <div className="grid justify-center gap-10 text-center md:grid-cols-2 lg:justify-start lg:text-left">
                      <div className="flex flex-col">
                        <span className="mb-4 text-4xl font-semibold md:text-6xl">
                          {testimonial.monthlyActiveUsers}
                        </span>
                        <span className="font-medium">{testimonial.monthlyActiveUsersLabel}</span>
                        <span className="text-muted-foreground">
                          {testimonial.monthlyActiveUsersPeriod}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="mb-4 text-4xl font-semibold md:text-6xl">
                          {testimonial.revenueIncrease}
                        </span>
                        <span className="font-medium">{testimonial.revenueIncreaseLabel}</span>
                        <span className="text-muted-foreground">
                          {testimonial.revenueIncreasePeriod}
                        </span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute bottom-6 right-6 z-10 lg:bottom-10 lg:right-10">
              <div className="relative flex items-center gap-4">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
