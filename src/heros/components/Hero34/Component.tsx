import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Hero34Fields } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { ClientMotionDiv } from '../shared/motion'

export default function Hero34({ badge, title, subtitle, links, image }: Hero34Fields) {
  return (
    <section>
      <div className="container">
        <div className="w-full overflow-hidden rounded-lg bg-accent/50 2xl:w-[calc(min(100vw-2*theme(container.padding),100%+8rem))]">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Content Area */}
            <div className="flex flex-col items-center p-card text-center lg:items-start lg:text-left">
              <ClientMotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex w-full flex-col items-center lg:items-start"
              >
                {/* Badge */}
                {badge && (
                  <span className="font-sans text-sm tracking-wide text-muted-foreground md:text-base">
                    {badge}
                  </span>
                )}

                {/* Title */}
                <h1
                  className={cn(
                    'font-heading text-4xl font-bold tracking-tight text-foreground lg:text-6xl',
                    'my-6 text-pretty',
                  )}
                >
                  {title}
                </h1>

                {/* Description */}
                {subtitle && (
                  <p className="mb-8 max-w-xl font-sans text-base text-muted-foreground lg:text-xl">
                    {subtitle}
                  </p>
                )}

                {/* Buttons */}
                {links && links.length > 0 && (
                  <div className="flex w-full flex-col gap-2 sm:flex-row justify-center lg:justify-start">
                    {links?.map((linkGroup, index) => (
                      <div key={index} className="flex flex-col gap-2 sm:flex-row">
                        {Object.entries(linkGroup).map(
                          ([key, link]) =>
                            link &&
                            typeof link === 'object' && (
                              <CMSLink
                                key={key}
                                className="inline-flex items-center transition-button hover:scale-button-hover sm:w-auto"
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

            {/* Image */}
            <ClientMotionDiv
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Media
                resource={image}
                imgClassName="h-[327px] md:h-[629px] w-full object-cover"
                priority
              />
            </ClientMotionDiv>
          </div>
        </div>
      </div>
    </section>
  )
}
