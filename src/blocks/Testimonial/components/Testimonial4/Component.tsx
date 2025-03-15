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
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col gap-6 md:gap-6 lg:gap-8">
          <div className="grid grid-cols-1 items-stretch gap-6 md:gap-6 lg:grid-cols-3 lg:gap-8">
            <div className="relative w-full bg-muted/50 rounded-2xl flex items-center justify-center py-12 md:py-16 lg:py-12 px-8">
              <div className="relative w-[100%] aspect-[16/9] translate-y-1">
                <Media
                  resource={featuredImage}
                  className="absolute inset-0 w-full h-full object-contain object-center"
                />
              </div>
            </div>
            <Card className="col-span-1 lg:col-span-2">
              <div className="flex flex-col justify-center h-full p-8">
                <q className="text-lg md:text-xl font-medium text-foreground leading-relaxed mb-6">
                  {featuredTestimonial.quote}
                </q>
                <div className="flex flex-col gap-1">
                  <p className="text-foreground font-medium">{featuredTestimonial.authorName}</p>
                  {featuredTestimonial.authorRole && (
                    <p className="text-muted-foreground">{featuredTestimonial.authorRole}</p>
                  )}
                </div>
              </div>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {gridTestimonials.map((testimonial, idx) => (
              <Card key={idx} className="flex flex-col">
                <CardContent className="flex-1 p-8">
                  <q className="text-muted-foreground text-base">{testimonial.quote}</q>
                </CardContent>
                <CardFooter className="p-8 pt-0">
                  <div className="flex items-center gap-3">
                    {!hideAuthorImages && (
                      <Avatar className="size-10 rounded-full overflow-hidden">
                        {testimonial.authorImage ? (
                          <Media
                            resource={testimonial.authorImage}
                            imgClassName="aspect-square size-full object-cover"
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
                    <div className="flex flex-col">
                      <p className="font-medium text-foreground">{testimonial.authorName}</p>
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
