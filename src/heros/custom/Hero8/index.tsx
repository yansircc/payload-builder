'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

import type { Page } from '@/payload-types'

import { ChevronRight } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { StyledRichText } from '@/components/RichText/StyledRichText'
import { NodeStyle } from '@/utilities/rich-text'

const HERO8_STYLES = [
  {
    type: 'heading',
    tag: 'h1',
    className: 'mb-8 text-pretty text-4xl font-medium lg:text-8xl',
  },
  {
    type: 'paragraph',
    className: 'mx-auto max-w-screen-md text-muted-foreground lg:text-xl',
  },
] satisfies NodeStyle[]

export default function Hero8({ richText, links, media }: Page['hero']) {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <section className="py-32">
      <div className="overflow-hidden border-b border-muted">
        <div className="container">
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <motion.div
              className="z-10 items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {richText && <StyledRichText data={richText} styles={HERO8_STYLES} />}

              {links && links.length > 0 && (
                <motion.div
                  className="mt-12 flex w-full flex-col justify-center gap-2 sm:flex-row"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  {links.map(({ link }, i) => (
                    <CMSLink
                      key={i}
                      {...link}
                      appearance={i === 0 ? 'default' : 'ghost'}
                      suffixElement={<ChevronRight className="ml-2 h-4" />}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>

          {media && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-24"
            >
              <Media
                resource={media}
                className="mx-auto max-h-[700px] w-full max-w-7xl rounded-t-lg object-cover shadow-lg"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
