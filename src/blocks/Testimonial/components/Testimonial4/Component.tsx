import type { Testimonial4Fields } from '@/payload-types'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Media } from '@/components/Media'

type TestimonialItem = Testimonial4Fields['testimonials'][number]

function assertValidTestimonials(
  testimonials: Testimonial4Fields['testimonials'],
): asserts testimonials is [TestimonialItem, TestimonialItem, TestimonialItem, TestimonialItem] {
  if (!testimonials || !Array.isArray(testimonials) || testimonials.length !== 4) {
    throw new Error('Testimonial4 requires exactly 4 testimonials')
  }
}

export default function Testimonial4({ testimonials, featuredImage }: Testimonial4Fields) {
  assertValidTestimonials(testimonials)
  const [featuredTestimonial, ...gridTestimonials] = testimonials

  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 items-stretch gap-x-0 gap-y-4 lg:grid-cols-3 lg:gap-4">
            <Media
              resource={featuredImage}
              className="h-72 w-full rounded-md object-cover lg:h-auto"
            />
            <Card className="col-span-2 flex items-center justify-center p-6">
              <div className="flex flex-col gap-4">
                <q className="text-xl font-medium lg:text-3xl">{featuredTestimonial.quote}</q>
                <div className="flex flex-col items-start">
                  <p>{featuredTestimonial.authorName}</p>
                  {featuredTestimonial.authorRole && (
                    <p className="text-muted-foreground">{featuredTestimonial.authorRole}</p>
                  )}
                </div>
              </div>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {gridTestimonials.map((testimonial, idx) => (
              <Card key={idx}>
                <CardContent className="px-6 pt-6 leading-7 text-foreground/70">
                  <q>{testimonial.quote}</q>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-4 leading-5">
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
                    <div className="text-sm">
                      <p className="font-medium">{testimonial.authorName}</p>
                      {testimonial.authorRole && (
                        <p className="text-muted-foreground">{testimonial.authorRole}</p>
                      )}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
