'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Expand, Globe, MoveRight, Rocket, Wrench } from 'lucide-react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { StyledRichText } from '@/components/RichText/StyledRichText'
import { NodeStyle } from '@/utilities/rich-text'

const ICONS = {
  Globe,
  Rocket,
  Expand,
  Wrench,
} as const

const HERO24_STYLES = [
  {
    type: 'heading',
    tag: 'h1',
    className: 'mt-4 text-balance text-4xl font-semibold lg:text-6xl',
  },
] satisfies NodeStyle[]

export default function Hero24({ richText, links, media, badge, features }: Page['hero']) {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  return (
    <section className="py-32">
      <div className="container">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {media && typeof media === 'object' && (
            <div className="relative mx-auto mb-5 h-16 w-16 md:mb-6 md:h-24 md:w-24 lg:mb-7 lg:h-28 lg:w-28">
              <Media resource={media} fill imgClassName="object-contain" priority />
            </div>
          )}

          {badge && (
            <span className="mb-3 text-sm tracking-widest text-muted-foreground md:text-base">
              {badge}
            </span>
          )}

          {richText && <StyledRichText data={richText} styles={HERO24_STYLES} />}

          {links && links.length > 0 && links[0] && (
            <CMSLink
              {...links[0].link}
              className="mt-8"
              size="lg"
              suffixElement={<MoveRight className="ml-2" strokeWidth={1} />}
            />
          )}
        </motion.div>

        {features && features.length > 0 && (
          <motion.div
            className="mt-16 grid gap-px overflow-hidden rounded-lg border bg-input md:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {features.map((feature, i) => {
              const IconComponent = feature.icon ? ICONS[feature.icon as keyof typeof ICONS] : Globe

              return (
                <motion.div
                  key={i}
                  className="flex flex-col gap-3 bg-background p-5 md:gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  <IconComponent className="size-6 shrink-0" />
                  <div>
                    <h2 className="text-sm font-semibold md:text-base">{feature.title}</h2>
                    <p className="text-sm text-muted-foreground md:text-base">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>
    </section>
  )
}
