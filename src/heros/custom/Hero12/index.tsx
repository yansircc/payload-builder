'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { StyledRichText } from '@/components/RichText/StyledRichText'
import { Badge } from '@/components/ui/badge'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { buttonVariants } from '@/components/ui/button'

import { NodeStyle } from '@/utilities/rich-text'

const IMPACT_STYLES = [
  {
    type: 'heading',
    tag: 'h1',
    className: 'mb-6 text-pretty text-2xl font-bold lg:text-5xl',
  },
  {
    type: 'paragraph',
    className: 'text-muted-foreground lg:text-xl',
  },
] satisfies NodeStyle[]

export default function Hero12({ richText, links, media, badge, partners }: Page['hero']) {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  return (
    <section className="relative overflow-hidden py-32">
      <div className="container">
        <div className="magicpattern absolute inset-x-0 top-0 -z-10 flex h-full w-full items-center justify-center opacity-100" />
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <motion.div
            className="z-10 flex flex-col items-center gap-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {media && typeof media === 'object' && (
              <div className="relative h-16 w-16">
                <Media resource={media} fill imgClassName="object-contain" priority />
              </div>
            )}

            {badge && <Badge variant="outline">{badge}</Badge>}

            {richText && <StyledRichText data={richText} styles={IMPACT_STYLES} />}

            {links && links.length > 0 && (
              <motion.div
                className="mt-4 flex justify-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {links.map(({ link }, i) => (
                  <CMSLink
                    key={i}
                    {...link}
                    suffixElement={i === 1 ? <ExternalLink className="ml-2 h-4" /> : undefined}
                  />
                ))}
              </motion.div>
            )}

            {partners && partners.length > 0 && (
              <motion.div
                className="mt-20 flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="text-center text-muted-foreground lg:text-left">
                  Built with open-source technologies
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {partners.map((partner, i) => (
                    <a
                      key={i}
                      href={partner.link}
                      className={cn(buttonVariants({ variant: 'outline' }), 'group px-3')}
                    >
                      {partner.logo && typeof partner.logo === 'object' && (
                        <div
                          className="relative"
                          style={{ height: partner.height || 24, width: partner.height || 24 }}
                        >
                          <Media
                            resource={partner.logo}
                            fill
                            imgClassName="saturate-0 transition-all group-hover:saturate-100 object-contain"
                          />
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
