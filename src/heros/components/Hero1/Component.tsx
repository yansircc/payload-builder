import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import { ArrowDownRight } from 'lucide-react'

import { ClientMotionDiv } from '../shared/motion'
import { ThemeEffect } from '../shared/ThemeEffect'
import type { Hero1Fields } from '@/payload-types'

export default function Hero1({ hero }: Hero1Fields) {
  const { title, subtitle, links, image, badge } = hero
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <ThemeEffect />
      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col items-start gap-6">
            <ClientMotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="rounded-full">
                {badge}
                <ArrowDownRight className="ml-2 size-4" />
              </Badge>
            </ClientMotionDiv>

            <ClientMotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="text-5xl font-bold tracking-tight lg:text-7xl">{title}</h1>
              {subtitle && (
                <p className="text-muted-foreground text-xl leading-relaxed max-w-[45ch]">
                  {subtitle}
                </p>
              )}
            </ClientMotionDiv>

            {links && links.length > 0 && (
              <ClientMotionDiv
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                {links.map(({ link }, i) => (
                  <CMSLink
                    key={i}
                    {...link}
                    suffixElement={i === 1 ? <ArrowDownRight className="ml-2 h-4" /> : undefined}
                  />
                ))}
              </ClientMotionDiv>
            )}
          </div>

          <ClientMotionDiv
            className="relative aspect-square lg:aspect-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative h-full w-full">
              <Media fill imgClassName="-z-10 object-cover" priority resource={image} />
            </div>
          </ClientMotionDiv>
        </div>
      </div>

      {/* 装饰性背景 */}
      <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2">
        <div className="absolute inset-0 bg-linear-to-tr from-background/80 via-background/60 to-background/20" />
      </div>
    </section>
  )
}
