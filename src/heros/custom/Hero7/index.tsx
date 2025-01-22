'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { StyledRichText } from '@/components/RichText/StyledRichText'
import { Avatar } from '@/components/ui/avatar'
import { Media } from '@/components/Media'

import { NodeStyle } from '@/utilities/rich-text'

const IMPACT_STYLES = [
  {
    type: 'heading',
    tag: 'h1',
    className: 'text-3xl font-extrabold lg:text-6xl',
  },
  {
    type: 'paragraph',
    className: 'text-balance text-muted-foreground lg:text-lg',
  },
] satisfies NodeStyle[]

export default function Hero7({ richText, links, avatars, reviewStats }: Page['hero']) {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  return (
    <section className="py-32">
      <div className="container text-center">
        <motion.div
          className="mx-auto flex max-w-screen-lg flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {richText && <StyledRichText data={richText} styles={IMPACT_STYLES} />}
        </motion.div>

        {links && links.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex items-center justify-center space-x-2"
          >
            {links.map(({ link }, i) => (
              <CMSLink key={i} size="lg" {...link} />
            ))}
          </motion.div>
        )}

        {(avatars && avatars.length > 0) || reviewStats ? (
          <motion.div
            className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {avatars && avatars.length > 0 && (
              <span className="mx-4 inline-flex items-center -space-x-4">
                {avatars.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.5 + i * 0.15,
                      ease: 'easeOut',
                    }}
                  >
                    <Avatar className="size-14 border">
                      {item.avatar && typeof item.avatar === 'object' && (
                        <Media resource={item.avatar} imgClassName="object-cover" fill />
                      )}
                    </Avatar>
                  </motion.div>
                ))}
              </span>
            )}

            {reviewStats && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: avatars ? 0.5 + avatars.length * 0.15 : 0.5,
                }}
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: (avatars ? 0.5 + avatars.length * 0.15 : 0.5) + i * 0.1,
                      }}
                    >
                      <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: (avatars ? 0.5 + avatars.length * 0.15 : 0.5) + 0.5,
                    }}
                    className="font-semibold"
                  >
                    {reviewStats.rating?.toFixed(1) || 5}
                  </motion.span>
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: (avatars ? 0.5 + avatars.length * 0.15 : 0.5) + 0.6,
                  }}
                  className="text-left font-medium text-muted-foreground"
                >
                  from {reviewStats.reviewCount}+ reviews
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}
