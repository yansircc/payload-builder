import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Hero8Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'

export default function Hero8({ title, subtitle, links, image }: Hero8Fields) {
  return (
    <section className="relative overflow-hidden bg-background py-section md:py-section-md lg:py-section-lg">
      <div className="container relative z-10">
        {/* Content Area */}
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <ClientMotionDiv
            className="z-10 items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Title */}
            <h1 className="mb-8 font-heading text-4xl lg:text-8xl tracking-tight font-bold">
              {title}
            </h1>

            {/* Description */}
            {subtitle && (
              <p className="mx-auto max-w-screen-md text-muted-foreground text-base lg:text-xl font-sans">
                {subtitle}
              </p>
            )}

            {/* Button Group */}
            {links && links.length > 0 && (
              <div className="mt-12 flex w-full flex-col justify-center gap-2 sm:flex-row">
                {links.map(({ link }, i) => (
                  <CMSLink
                    key={i}
                    {...link}
                    className="w-full sm:w-auto transition-button hover:scale-button-hover hover:opacity-button-hover"
                  />
                ))}
              </div>
            )}
          </ClientMotionDiv>
        </div>

        {/* Bottom Image */}
        {image && (
          <ClientMotionDiv
            className="mt-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Media
              resource={image}
              className="mx-auto max-h-[700px] w-full max-w-7xl rounded-lg shadow-card"
              imgClassName="object-cover w-full h-full"
              priority
            />
          </ClientMotionDiv>
        )}
      </div>

      {/* Decorative Background */}
      <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2">
        <div className="absolute inset-0 bg-linear-to-tr from-background/80 via-background/60 to-background/20" />
      </div>
    </section>
  )
}
