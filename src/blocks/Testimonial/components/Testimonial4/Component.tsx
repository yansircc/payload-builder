import { Media } from '@/components/Media'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import type { Testimonial4Fields } from '@/payload-types'

type TestimonialItem = Testimonial4Fields['testimonials'][number]

interface Testimonial4Props extends Testimonial4Fields {
  hideAuthorImages?: boolean
}

function assertValidTestimonials(
  testimonials: Testimonial4Fields['testimonials'],
): asserts testimonials is [TestimonialItem, TestimonialItem, TestimonialItem, TestimonialItem] {
  if (!testimonials || !Array.isArray(testimonials) || testimonials.length !== 4) {
    throw new Error('Testimonial4 requires exactly 4 testimonials')
  }
}

export default function Testimonial4({
  testimonials,
  featuredImage,
  hideAuthorImages,
}: Testimonial4Props) {
  assertValidTestimonials(testimonials)
  const [featuredTestimonial, ...gridTestimonials] = testimonials

  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="grid grid-cols-1 items-stretch gap-x-0 gap-y-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 md:gap-6">
            <div className="relative w-full aspect-[16/9] md:h-[300px] lg:h-[350px]">
              <Media
                resource={featuredImage}
                className="absolute inset-0 w-full h-full rounded-lg object-cover md:object-center"
              />
            </div>
            <Card className="col-span-1 md:col-span-1 lg:col-span-2 flex items-center md:h-[300px] lg:h-[250px] p-4 md:p-6 lg:p-8">
              <div className="flex flex-col gap-2 md:gap-3">
                <q className="text-base font-medium text-foreground md:text-lg lg:text-xl leading-relaxed">
                  {featuredTestimonial.quote}
                </q>
                <div className="flex flex-col items-start gap-0.5">
                  <p className="text-foreground text-sm md:text-base font-semibold">
                    {featuredTestimonial.authorName}
                  </p>
                  {featuredTestimonial.authorRole && (
                    <p className="text-foreground text-xs md:text-sm">
                      {featuredTestimonial.authorRole}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {gridTestimonials.map((testimonial, idx) => (
              <Card key={idx} className="flex flex-col">
                <CardContent className="flex-1 px-4 pt-4 md:px-6 md:pt-6 leading-relaxed text-foreground/70">
                  <q className="text-sm md:text-base">{testimonial.quote}</q>
                </CardContent>
                <CardFooter className="px-4 py-4 md:px-6 md:py-6 border-t">
                  <div className="flex items-center gap-3 md:gap-4">
                    {!hideAuthorImages && (
                      <Avatar className="size-8 md:size-10 rounded-full ring-1 ring-input overflow-hidden">
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
                    <div className="flex flex-col gap-0.5">
                      <p className="font-medium text-foreground text-sm md:text-base">
                        {testimonial.authorName}
                      </p>
                      {testimonial.authorRole && (
                        <p className="text-foreground text-xs md:text-sm">
                          {testimonial.authorRole}
                        </p>
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
