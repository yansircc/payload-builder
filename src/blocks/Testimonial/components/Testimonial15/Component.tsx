import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Avatar } from '@/components/ui/avatar'
import type { Testimonial15Fields } from '@/payload-types'

export default function Testimonial15({
  title,
  description,
  cta,
  companySection,
  testimonials,
}: Testimonial15Fields) {
  return (
    <section className="mb-32 bg-muted pt-32">
      <div className="container">
        <div className="grid gap-20 lg:grid-cols-2 lg:gap-32">
          <div className="text-center lg:text-left">
            <h1 className="mb-4 text-balance text-3xl font-bold lg:text-4xl">{title}</h1>
            <p className="mb-8 text-muted-foreground">{description}</p>
            {cta && <CMSLink className="mb-10 lg:mb-20" {...cta} />}
            <p className="mb-7 text-xs uppercase text-muted-foreground">{companySection?.text}</p>
            <div className="flex flex-wrap items-center justify-center gap-10 lg:justify-start">
              {companySection?.logos?.map((logo, idx) => (
                <div
                  key={idx}
                  className="relative flex h-8 w-32 items-center justify-center overflow-hidden sm:h-11"
                >
                  <Media resource={logo.image} className="max-h-full w-auto object-contain" />
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
                  <Avatar className="size-9 rounded-full ring-1 ring-input overflow-hidden">
                    {testimonial.authorImage && (
                      <Media
                        resource={testimonial.authorImage}
                        imgClassName="aspect-square size-full object-cover object-center"
                        className="!block size-full"
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
