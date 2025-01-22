import type { Page } from '@/payload-types'

import { ExternalLink } from 'lucide-react'

import { cn } from '@/utilities/ui'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

import { ClientMotionDiv } from '@/heros/share/motion'
import { ThemeEffect } from '@/heros/share/ThemeEffect'

type Hero12Data = NonNullable<NonNullable<Page['hero']>['hero12']>

export default function Hero12({ title, description, badge, logo, links, partners }: Hero12Data) {
  return (
    <section className="relative overflow-hidden py-32">
      <ThemeEffect theme="dark" />
      <div className="container">
        <div className="magicpattern absolute inset-x-0 top-0 -z-10 flex h-full w-full items-center justify-center opacity-100" />
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <ClientMotionDiv
            className="z-10 flex flex-col items-center gap-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo */}
            {logo && typeof logo === 'object' && (
              <div className="inline-flex h-16">
                <Media
                  resource={logo}
                  className="h-full w-auto"
                  imgClassName="h-full w-auto object-contain"
                />
              </div>
            )}

            {/* Badge */}
            {badge && <Badge variant="outline">{badge}</Badge>}

            {/* Title & Description */}
            <div>
              <h1 className="mb-6 text-pretty text-2xl font-bold lg:text-5xl">{title}</h1>
              {description && <p className="text-muted-foreground lg:text-xl">{description}</p>}
            </div>

            {/* Buttons */}
            {links && links.length > 0 && (
              <ClientMotionDiv
                className="mt-4 flex justify-center gap-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {links.map(({ link }, i) => (
                  <CMSLink
                    key={i}
                    {...link}
                    suffixElement={i === 1 ? <ExternalLink className="ml-2 h-4" /> : undefined}
                  />
                ))}
              </ClientMotionDiv>
            )}

            {/* Partners */}
            {partners && partners.length > 0 && (
              <ClientMotionDiv
                className="mt-20 flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <p className="text-center text-muted-foreground lg:text-left">
                  Built with open-source technologies
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {partners.map(({ logo }, i) => (
                    <a
                      key={i}
                      href="#"
                      className={cn(buttonVariants({ variant: 'outline' }), 'group px-3')}
                    >
                      {logo && typeof logo === 'object' && (
                        <div className="inline-flex h-6">
                          <Media
                            resource={logo}
                            className="h-full w-auto"
                            imgClassName="h-full w-auto object-contain saturate-0 transition-all group-hover:saturate-100"
                          />
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              </ClientMotionDiv>
            )}
          </ClientMotionDiv>
        </div>
      </div>
    </section>
  )
}
