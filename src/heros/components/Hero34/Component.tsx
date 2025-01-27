import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { ClientMotionDiv } from '../shared/motion'
import type { Hero34Fields } from '@/payload-types'

export default function Hero34({ hero }: Hero34Fields) {
  const { badge, title, subtitle, links, image } = hero

  return (
    <section>
      <div className="container flex flex-col items-center">
        <div className="w-full overflow-clip rounded-lg bg-accent/50 2xl:w-[calc(min(100vw-2*theme(container.padding),100%+8rem))]">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Left Content Area */}
            <div className="container flex flex-col items-center px-[4rem] py-32 text-center lg:mx-auto lg:items-start lg:px-[4rem] lg:text-left">
              <ClientMotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex w-full flex-col items-center lg:items-start"
              >
                {/* Badge */}
                {badge && (
                  <span className="text-sm tracking-widest text-muted-foreground md:text-base">
                    {badge}
                  </span>
                )}

                {/* Title */}
                <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">{title}</h1>

                {/* Description */}
                {subtitle && (
                  <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">{subtitle}</p>
                )}

                {/* Buttons */}
                {links && links.length > 0 && (
                  <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                    {links?.map((linkGroup, index) => (
                      <div key={index} className="flex w-full flex-col gap-2 sm:flex-row">
                        {Object.entries(linkGroup)
                          .filter(([key]) => key.startsWith('link-'))
                          .map(
                            ([key, link]) =>
                              link &&
                              typeof link === 'object' && (
                                <CMSLink
                                  key={key}
                                  className="inline-flex w-full items-center sm:w-auto"
                                  {...link}
                                />
                              ),
                          )}
                      </div>
                    ))}
                  </div>
                )}
              </ClientMotionDiv>
            </div>

            {/* Right Image */}
            <ClientMotionDiv
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Media
                resource={image}
                className="h-full w-full"
                imgClassName="object-cover"
                priority
              />
            </ClientMotionDiv>
          </div>
        </div>
      </div>
    </section>
  )
}
