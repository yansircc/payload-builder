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
                    <blockquote className="mb-8 text-lg lg:text-xl text-foreground">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-3xl font-bold lg:text-4xl text-foreground">
                          {testimonial.monthlyActiveUsers}
                        </div>
                        <div className="text-sm text-foreground">
                          {testimonial.monthlyActiveUsersLabel}
                        </div>
                        <div className="mt-1 text-xs text-foreground">
                          {testimonial.monthlyActiveUsersPeriod}
                        </div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold lg:text-4xl text-foreground">
                          {testimonial.revenueIncrease}
                        </div>
                        <div className="text-sm text-foreground">
                          {testimonial.revenueIncreaseLabel}
                        </div>
                        <div className="mt-1 text-xs text-foreground">
                          {testimonial.revenueIncreasePeriod}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {showNavigation && (
              <>
                <CarouselPrevious className="absolute left-4 top-1/2 text-foreground" />
                <CarouselNext className="absolute right-4 top-1/2 text-foreground" />
              </>
            )}
          </Carousel>
        </div>
      </div>
    </section>
  )
}
