import { Media } from '@/components/Media'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { Testimonial12Fields } from '@/payload-types'

export default function Testimonial12({ testimonials }: Testimonial12Fields) {
  const showNavigation = testimonials && testimonials.length > 1

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
                  <div
                    className={`${!testimonial.authorImage ? 'flex flex-col justify-center' : ''}`}
                  >
                    {testimonial.authorImage ? (
                      <div className="mx-auto max-w-[320px] lg:max-w-none rounded-xl lg:mx-0 overflow-hidden">
                        <Media
                          resource={testimonial.authorImage}
                          className="w-full aspect-[4/3]"
                          imgClassName="object-cover object-center w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="text-center lg:text-left">
                        <h3 className="text-2xl font-bold lg:text-3xl mb-2 text-foreground">
                          {testimonial.authorName}
                        </h3>
                        <p className="text-lg text-foreground lg:text-xl">
                          {testimonial.authorRole}
                        </p>
                      </div>
                    )}
                    {testimonial.authorImage && (
                      <div className="mt-4 text-center">
                        <h3 className="font-semibold text-foreground">{testimonial.authorName}</h3>
                        <p className="text-foreground">{testimonial.authorRole}</p>
                      </div>
                    )}
                  </div>
                  <div className="col-span-2">
                    <div className="mb-6 flex items-center justify-center gap-2 lg:mb-8 lg:justify-start">
                      {testimonial.companyLogo && typeof testimonial.companyLogo !== 'string' && (
                        <div className="h-auto w-7 lg:w-11">
                          <Media
                            resource={testimonial.companyLogo}
                            className="w-full h-full"
                            imgClassName="object-contain"
                          />
                        </div>
                      )}
                      <span className="text-xl font-semibold lg:text-3xl text-foreground">
                        {testimonial.companyName}
                      </span>
                    </div>
                    <blockquote className="mb-8 text-lg lg:text-xl text-foreground text-center">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="flex flex-col gap-10 text-center sm:mx-auto sm:max-w-[480px] md:grid md:grid-cols-2 lg:mx-0 lg:max-w-none lg:text-left">
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
            {showNavigation && (
              <div className="absolute bottom-6 right-6 z-10 lg:bottom-10 lg:right-10">
                <div className="relative flex items-center gap-4">
                  <CarouselPrevious className="static translate-y-0" />
                  <CarouselNext className="static translate-y-0" />
                </div>
              </div>
            )}
          </Carousel>
        </div>
      </div>
    </section>
  )
}
