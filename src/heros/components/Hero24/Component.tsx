import * as LucideIcons from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Hero24Fields } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { ClientMotionDiv } from '../shared/motion'

// 移除不必要的 FeatureItem 接口
type Feature = {
  icon: string
  title: string
  description: string
}

type IconComponent = React.ComponentType<{
  className?: string
  size?: number | string
}>

export default function Hero24({ hero }: Hero24Fields) {
  const { badge, logo, features, title, links } = hero

  return (
    <section className="py-section md:py-section-md lg:py-section-lg">
      <div className="container">
        <div className="text-center">
          <ClientMotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            {/* Logo */}
            {logo && typeof logo === 'object' && (
              <Media
                resource={logo}
                className="mx-auto mb-5 w-16 md:mb-6 md:w-24 lg:mb-7 lg:w-28"
                imgClassName="w-full h-auto"
                priority
              />
            )}

            {/* Badge */}
            {badge && (
              <span
                className={cn('mb-3 tracking-wide text-muted-foreground', 'text-sm md:text-base')}
              >
                {badge}
              </span>
            )}

            {/* Title */}
            <h1
              className={cn('mt-4 font-heading font-bold tracking-tight', 'text-4xl lg:text-6xl')}
            >
              {title}
            </h1>

            {/* Button */}
            {links && (
              <div className="mt-8">
                {links.map((linkGroup) => (
                  <>
                    {linkGroup['link'] && <CMSLink key="link" size="lg" {...linkGroup['link']} />}
                  </>
                ))}
              </div>
            )}
          </ClientMotionDiv>
        </div>

        {/* Feature List */}
        {features && (
          <ClientMotionDiv
            className="mt-16 grid gap-px overflow-hidden rounded-lg border bg-input md:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {features.map(({ icon, title, description }: Feature, i) => {
              // 使用双重类型转换来安全地获取图标组件
              const IconComponent =
                (LucideIcons as unknown as Record<string, IconComponent>)[icon] ?? LucideIcons.Globe

              return (
                <div key={i} className="flex flex-col gap-3 bg-background p-5 md:gap-6">
                  <IconComponent className="size-6 shrink-0" />
                  <div>
                    <h2 className={cn('font-sans font-semibold', 'text-sm md:text-base')}>
                      {title}
                    </h2>
                    <p className={cn('text-muted-foreground', 'text-sm md:text-base')}>
                      {description}
                    </p>
                  </div>
                </div>
              )
            })}
          </ClientMotionDiv>
        )}
      </div>
    </section>
  )
}
