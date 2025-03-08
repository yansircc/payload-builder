import { ArrowDownRight } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import type { Hero1Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'

export default function Hero1({ title, subtitle, links, image, badge }: Hero1Fields) {
  return (
    <section className="relative overflow-hidden bg-background py-section md:py-section-md lg:py-section-lg">
      <div className="container relative z-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {badge && (
              <ClientMotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge
                  variant="outline"
                  className="rounded-lg transition-button hover:scale-button-hover"
                >
                  {badge}
                  <ArrowDownRight className="ml-2 size-4" />
                </Badge>
              </ClientMotionDiv>
            )}

            <ClientMotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 "
            >
              <h1 className="my-6 font-heading text-5xl lg:text-7xl tracking-tight font-bold">
                {title}
              </h1>
              {subtitle && (
                <p className="mb-8 text-muted-foreground text-xl font-sans max-w-[45ch]">
                  {subtitle}
                </p>
              )}
            </ClientMotionDiv>

            {links && links.length > 0 && (
              <ClientMotionDiv
                className="flex flex-row gap-4 w-full sm:w-auto"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                {links.map((linkGroup, index) => (
                  <div
                    key={index}
                    className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start"
                  >
                    {Object.entries(linkGroup).map(
                      ([key, link]) =>
                        link && typeof link === 'object' && <CMSLink key={key} {...link} />,
                    )}
                  </div>
                ))}
              </ClientMotionDiv>
            )}
          </div>

          <ClientMotionDiv
            className="relative aspect-square lg:aspect-auto min-h-[400px] lg:min-h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {image && (
              <Media
                fill
                className="relative h-full w-full"
                imgClassName="object-cover rounded-md h-full w-full"
                priority
                resource={image}
              />
            )}
          </ClientMotionDiv>
        </div>
      </div>

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/60 to-background/20" />
      </div>
    </section>
  )
}
