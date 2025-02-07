import { Star, Zap } from 'lucide-react'
import { Media } from '@/components/Media'
import { Avatar } from '@/components/ui/avatar'
import type { Testimonial18Fields } from '@/payload-types'

export default function Testimonial18({
  heading,
  subheading,
  statsText,
  testimonial,
}: Testimonial18Fields) {
  const { quote, description, authorName, authorRole, authorImage, rating } = testimonial

  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-1 text-sm font-semibold">
            <Zap className="h-6 w-auto fill-primary" />
            {statsText}
          </div>
          <h2 className="text-center text-3xl font-semibold lg:text-4xl">{heading}</h2>
          <p className="text-center text-muted-foreground lg:text-lg">{subheading}</p>
        </div>
        <div className="mx-auto mt-20 max-w-screen-lg rounded-2xl bg-muted p-6 md:p-20">
          <div className="mb-6 flex gap-1">
            {Array.from({ length: rating || 5 }).map((_, i) => (
              <Star key={i} className="size-5 fill-amber-500 text-amber-500" />
            ))}
          </div>
          <q className="text-2xl font-semibold md:text-4xl">{quote}</q>
          <p className="mt-6 text-muted-foreground">{description}</p>
          <div className="mt-6 flex gap-4">
            <Avatar className="size-14 rounded-full ring-1 ring-input overflow-hidden">
              {authorImage && (
                <Media
                  resource={authorImage}
                  imgClassName="aspect-square size-full object-cover object-center"
                  className="!block size-full"
                />
              )}
            </Avatar>
            <div>
              <p className="font-medium">{authorName}</p>
              <p className="text-sm text-muted-foreground">{authorRole}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
