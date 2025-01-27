import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

import { ClientMotionDiv } from '../shared/motion'
import { ThemeEffect } from '../shared/ThemeEffect'
import type { Hero5Fields } from '@/payload-types'

export default function Hero5({ hero }: Hero5Fields) {
  const { title, subtitle, link, image } = hero
  return (
    <section className="overflow-hidden py-32">
      <ThemeEffect />
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-20 lg:flex-row">
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <ClientMotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <h1 className="text-pretty text-4xl font-bold lg:max-w-md lg:text-7xl">{title}</h1>
            </ClientMotionDiv>

            {subtitle && (
              <ClientMotionDiv
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="max-w-xl text-xl font-medium lg:text-2xl">{subtitle}</p>
              </ClientMotionDiv>
            )}

            {link && (
              <ClientMotionDiv
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex w-full justify-center lg:justify-start"
              >
                <CMSLink {...link} />
              </ClientMotionDiv>
            )}
          </div>

          <ClientMotionDiv
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative aspect-video w-full lg:w-auto"
          >
            <Media
              resource={image}
              className="aspect-video w-full"
              imgClassName="rounded-md object-cover"
              priority
            />
          </ClientMotionDiv>
        </div>
      </div>
    </section>
  )
}
