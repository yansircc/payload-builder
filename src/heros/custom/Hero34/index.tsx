'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { StyledRichText } from '@/components/RichText/StyledRichText'
import { NodeStyle } from '@/utilities/rich-text'

const HERO34_STYLES = [
  {
    type: 'heading',
    tag: 'h1',
    className: 'my-6 text-pretty text-4xl font-bold lg:text-6xl',
  },
  {
    type: 'paragraph',
    className: 'mb-8 max-w-xl text-muted-foreground lg:text-xl',
  },
] satisfies NodeStyle[]

export default function Hero34({ richText, links, media, badge }: Page['hero']) {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  return (
    <section>
      <div className="container flex flex-col items-center">
        <div className="w-full overflow-clip rounded-lg bg-accent/50 2xl:w-[calc(min(100vw-2*theme(container.padding),100%+8rem))]">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <motion.div
              className="container flex flex-col items-center px-[4rem] py-32 text-center lg:mx-auto lg:items-start lg:px-[4rem] lg:text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {badge && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {badge}
                </motion.div>
              )}

              {richText && <StyledRichText data={richText} styles={HERO34_STYLES} />}

              {links && links.length > 0 && (
                <motion.div
                  className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {links.map(({ link }, i) => (
                    <CMSLink
                      key={i}
                      {...link}
                      className="w-full sm:w-auto"
                      appearance={i === 0 ? 'default' : 'outline'}
                      prefixElement={i === 0 ? <ArrowRight className="mr-2 size-4" /> : undefined}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>

            {media && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <Media resource={media} className="h-full w-full object-cover" />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
