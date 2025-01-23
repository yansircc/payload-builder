import { MoveRight } from 'lucide-react'
import * as LucideIcons from 'lucide-react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { ClientMotionDiv } from '@/heros/share/motion'
import type { Page } from '@/payload-types'

type Hero25Data = NonNullable<NonNullable<Page['hero']>['hero25']>

export default function Hero25({ logo, badge, title, links, features }: Hero25Data) {
  return (
    <section className="py-32">
      <div className="container">
        <div className="text-center">
          {/* Logo */}
          <ClientMotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-5 w-16 md:mb-6 md:w-24 lg:mb-7 lg:w-28"
          >
            <Media resource={logo} className="w-full" />
          </ClientMotionDiv>

          {/* Badge */}
          <ClientMotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="mb-3 text-sm tracking-widest text-muted-foreground md:text-base">
              {badge}
            </span>
          </ClientMotionDiv>

          {/* Title */}
          <ClientMotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="mt-4 text-balance text-4xl font-semibold lg:text-6xl">{title}</h1>
          </ClientMotionDiv>

          {/* CTA Buttons */}
          {links && links.length > 0 && (
            <ClientMotionDiv
              className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {links.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  className={i === 0 ? 'btn-primary' : 'btn-secondary'}
                  suffixElement={<MoveRight className="ml-2" strokeWidth={1} />}
                />
              ))}
            </ClientMotionDiv>
          )}

          {/* Features */}
          {features && features.length > 0 && (
            <ClientMotionDiv
              className="mt-6 lg:mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ul className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground lg:text-base">
                {features.map(({ text, icon }, i) => {
                  const Icon = (LucideIcons as any)[icon] || LucideIcons.HelpCircle
                  return (
                    <li key={i} className="flex items-center gap-2 whitespace-nowrap">
                      <Icon className="size-4" />
                      {text}
                    </li>
                  )
                })}
              </ul>
            </ClientMotionDiv>
          )}
        </div>
      </div>
    </section>
  )
}
