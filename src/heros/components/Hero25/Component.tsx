import * as LucideIcons from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Hero25Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'

type IconComponent = React.ComponentType<{
  className?: string
  size?: number | string
}>

export default function Hero25({ hero }: Hero25Fields) {
  const { logo, badge, features, title, links } = hero

  return (
    <section className="py-section md:py-section-md lg:py-section-lg">
      <div className="container">
        <div className="text-center">
          {/* Logo */}
          <ClientMotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-5 w-16 md:mb-6 md:w-24 lg:mb-7 lg:w-28"
          >
            {logo && typeof logo === 'object' && (
              <Media resource={logo} className="w-full" priority />
            )}
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
            <h1 className="mt-4 text-4xl font-heading font-bold tracking-tight lg:text-6xl text-foreground">
              {title}
            </h1>
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
                <CMSLink key={i} {...link} />
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
                {features.map(({ title, icon }, i) => {
                  const IconComponent =
                    (LucideIcons as unknown as Record<string, IconComponent>)[icon] ??
                    LucideIcons.HelpCircle

                  return (
                    <li key={i} className="flex items-center gap-2 whitespace-nowrap">
                      <IconComponent className="size-4" />
                      {title}
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
