'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { StyledRichText } from '@/components/RichText/StyledRichText'

import { Badge } from '@/components/ui/badge'
import { ArrowDownRight } from 'lucide-react'
import { NodeStyle } from '@/utilities/rich-text'

const IMPACT_STYLES = [
  {
    type: 'heading',
    tag: 'h1',
    className: 'text-5xl font-bold tracking-tight lg:text-7xl mb-6',
  },
  {
    type: 'heading',
    tag: 'h2',
    className: 'text-3xl font-semibold mb-4',
  },
  {
    type: 'paragraph',
    className: 'text-muted-foreground text-xl leading-relaxed max-w-[45ch]',
  },
] satisfies NodeStyle[]

export default function Hero1({ richText, links, media, badge }: Page['hero']) {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col items-start gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="rounded-full">
                {badge}
                <ArrowDownRight className="ml-2 size-4" />
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {richText && <StyledRichText data={richText} styles={IMPACT_STYLES} />}
            </motion.div>

            {links && links.length > 0 && (
              <motion.div
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
              </motion.div>
            )}
          </div>

          <motion.div
            className="relative aspect-square lg:aspect-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative h-full w-full">
              {media && typeof media === 'object' && (
                <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 装饰性背景 */}
      <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2">
        <div className="absolute inset-0 bg-linear-to-tr from-background/80 via-background/60 to-background/20" />
      </div>
    </section>
  )
}
