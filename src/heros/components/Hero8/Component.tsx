import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { ChevronRight } from 'lucide-react'

import { ClientMotionDiv } from '../shared/motion'
import { ThemeEffect } from '../shared/ThemeEffect'
import type { Hero8Fields } from '@/payload-types'

export default function Hero8({ hero }: Hero8Fields) {
  const { title, subtitle, links, image } = hero

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <ThemeEffect />
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
            <h1 className="mb-8 text-pretty text-4xl font-medium lg:text-8xl">{title}</h1>

            {/* Description */}
            {subtitle && (
              <p className="mx-auto max-w-screen-md text-muted-foreground lg:text-xl">{subtitle}</p>
            )}

            {/* Button Group */}
            {links && links.length > 0 && (
              <div className="mt-12 flex w-full flex-col justify-center gap-2 sm:flex-row">
                {links.map(({ link }, i) => (
                  <CMSLink
                    key={i}
                    {...link}
                    className="w-full sm:w-auto"
                    suffixElement={<ChevronRight className="ml-2 h-4" />}
                  />
                ))}
              </div>
            )}
          </ClientMotionDiv>
        </div>

        {/* Bottom Image */}
        <ClientMotionDiv
          className="mt-24"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Media
            resource={image}
            className="mx-auto max-h-[700px] w-full max-w-7xl rounded-t-lg shadow-lg"
            imgClassName="object-cover w-full h-full"
            priority
          />
        </ClientMotionDiv>
      </div>

      {/* Decorative Background */}
      <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2">
        <div className="absolute inset-0 bg-linear-to-tr from-background/80 via-background/60 to-background/20" />
      </div>
    </section>
  )
}
