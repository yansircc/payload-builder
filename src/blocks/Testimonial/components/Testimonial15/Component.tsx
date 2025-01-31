'use client'

import type { Testimonial15Fields } from '@/payload-types'

import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Media as MediaComponent } from '@/components/Media'

export default function Testimonial15({
  title = 'Explore the Innovators Community Today',
  description = 'Join a global network of thought leaders, product developers, and innovators to exchange ideas, learn from each other, and participate in unique events and discussions.',
  buttonText = 'Become a Member',
  buttonLink = '#',
  companyLogos = [],
  testimonials = [],
}: Testimonial15Fields) {
  return (
    <section className="mb-32 bg-muted pt-32">
      <div className="container">
        <div className="grid gap-20 lg:grid-cols-2 lg:gap-32">
          <div className="text-center lg:text-left">
            <h1 className="mb-4 text-balance text-3xl font-bold lg:text-4xl">{title}</h1>
            <p className="mb-8 text-muted-foreground">{description}</p>
            <Button asChild className="mb-10 lg:mb-20">
              <a href={buttonLink ?? '#'}>{buttonText}</a>
            </Button>
            <p className="mb-7 text-xs uppercase text-muted-foreground">
              Used by leading companies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10 lg:justify-start">
              {companyLogos?.map((logo, idx) => (
                <div
                  key={idx}
                  className="relative flex h-8 w-32 items-center justify-center overflow-hidden sm:h-11"
                >
                  <MediaComponent
                    resource={logo.image}
                    className="max-h-full w-auto object-contain"
                    alt={logo.altText || 'Company logo'}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {testimonials?.map((testimonial, idx) => {
              const isLast = idx === testimonials.length - 1
              const isOdd = idx % 2 === 1

              return (
                <div
                  key={idx}
                  className={`flex gap-5 ${
                    isLast
                      ? 'rounded-t-xl border-x border-t px-5 pb-1 pt-6'
                      : isOdd
                        ? 'rounded-xl border p-6'
                        : 'rounded-xl bg-background p-6'
                  }`}
                >
                  <Avatar className="size-9 rounded-full ring-1 ring-input">
                    {testimonial.authorImage && (
                      <MediaComponent
                        resource={testimonial.authorImage}
                        className="size-full object-cover"
                      />
                    )}
                  </Avatar>
                  <div>
                    <p className="mb-1 text-sm font-medium">{testimonial.authorName}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.quote}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
