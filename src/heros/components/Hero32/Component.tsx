import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Hero32Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'

export default function Hero32({ hero }: Hero32Fields) {
  const { title, subtitle, link, integrations } = hero

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1400 600"
          className="min-h-full min-w-full"
        >
          <defs>
            <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="1"
                strokeOpacity={0.5}
              />
            </pattern>
          </defs>
          <rect width="1400" height="600" fill="url(#grid)" />
        </svg>
      </div>
      <div className="relative">
        <div className="absolute left-0 z-10 hidden h-full w-1/2 bg-[linear-gradient(to_right,var(--background)_85%,transparent_100%)] md:block"></div>
        <div className="md:-space-x-26 container relative flex flex-col items-start md:flex-row md:items-center">
          <div className="z-20 -mx-[var(--layout-containerPadding)] w-[calc(100%+2*var(--layout-containerPadding))] shrink-0 bg-background px-[var(--layout-containerPadding)] pt-32 md:w-1/2 md:bg-transparent md:pb-32">
            <div className="flex flex-col items-start text-left">
              <div className="max-w-sm">
                <ClientMotionDiv
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">{title}</h1>
                </ClientMotionDiv>

                {subtitle && (
                  <ClientMotionDiv
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <p className="text-muted-foreground text-base lg:text-lg font-sans">
                      {subtitle}
                    </p>
                  </ClientMotionDiv>
                )}

                {link && (
                  <ClientMotionDiv
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="mt-10"
                  >
                    <CMSLink {...link} />
                  </ClientMotionDiv>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-16 pb-8 pt-12 md:py-32">
              {integrations &&
                [0, 1, 2].map((rowIndex) => {
                  const startIndex = rowIndex * 5
                  const rowIntegrations = integrations.slice(startIndex, startIndex + 5)

                  return (
                    <div key={rowIndex} className="flex gap-x-24 odd:-translate-x-24">
                      {rowIntegrations.map((integration, i) => (
                        <div
                          key={i}
                          className="size-24 rounded-xl border border-background bg-background shadow-xl"
                        >
                          <div className="h-full w-full bg-muted/20 p-4">
                            <Media
                              resource={integration.image}
                              className="size-full"
                              imgClassName="size-full object-cover"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
