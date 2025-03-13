import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Avatar } from '@/components/ui/avatar'
import type { Testimonial15Fields } from '@/payload-types'
import { cn } from '@/utilities/ui'

interface Testimonial15Props extends Testimonial15Fields {
  hideAuthorImages?: boolean
}

export default function Testimonial15({
  title,
  description,
  cta,
  companySection,
  testimonials,
  hideAuthorImages,
}: Testimonial15Props) {
  return (
    <section className="py-32">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="text-center lg:text-left">
            <h2 className="mb-6 text-balance text-3xl font-bold lg:text-4xl text-foreground">
              {title}
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">{description}</p>
            <div className="flex justify-center lg:justify-start">
              {cta && <CMSLink {...cta} />}
            </div>
            {companySection?.logos && companySection.logos.length > 0 && (
              <div className="mt-8">
                <p className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  {companySection.text}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8 lg:justify-start">
                  {companySection.logos.map((logo, idx) => (
                    <div
                      key={idx}
                      className="relative flex h-8 w-28 items-center justify-center overflow-hidden sm:h-10"
                    >
                      <Media resource={logo.image} className="max-h-full w-auto object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6">
            {testimonials?.map((testimonial, idx) => (
              <div
                key={idx}
                className={cn('rounded-3xl p-8', idx % 2 === 0 ? 'bg-white' : 'rounded-xl border')}
              >
                <div className="flex gap-4">
                  {!hideAuthorImages && testimonial.authorImage && (
                    <Avatar className="size-12 overflow-hidden flex-shrink-0">
                      <Media
                        resource={testimonial.authorImage}
                        imgClassName="aspect-square size-full object-cover"
                        className="!block size-full"
                      />
                    </Avatar>
                  )}
                  <div className="flex flex-col">
                    <p
                      className={cn(
                        'font-medium',
                        idx % 2 === 0 ? 'text-muted-foreground' : 'text-foreground',
                      )}
                    >
                      {testimonial.authorName}
                    </p>
                    <p
                      className={cn(
                        'text-lg',
                        idx % 2 === 0 ? 'text-muted-foreground' : 'text-muted-foreground/80',
                      )}
                    >
                      {testimonial.quote}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
