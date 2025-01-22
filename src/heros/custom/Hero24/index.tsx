import { MoveRight } from 'lucide-react'
import * as LucideIcons from 'lucide-react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { ClientMotionDiv } from '@/heros/share/motion'

type Hero24Data = NonNullable<NonNullable<Page['hero']>['hero24']>

export default function Hero24({ badge, title, logo, links, features }: Hero24Data) {
  return (
    <section className="py-32">
      <div className="container">
        <div className="text-center">
          <ClientMotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            {/* Logo */}
            <Media
              resource={logo}
              className="mx-auto mb-5 w-16 md:mb-6 md:w-24 lg:mb-7 lg:w-28"
              imgClassName="w-full h-auto"
              priority
            />

            {/* 标签 */}
            {badge && (
              <span className="mb-3 text-sm tracking-widest text-muted-foreground md:text-base">
                {badge}
              </span>
            )}

            {/* 标题 */}
            <h1 className="mt-4 text-balance text-4xl font-semibold lg:text-6xl">{title}</h1>

            {/* 按钮 */}
            {links?.[0] && (
              <div className="mt-8">
                <CMSLink
                  {...links[0].link}
                  size="lg"
                  suffixElement={<MoveRight className="ml-2" strokeWidth={1} />}
                />
              </div>
            )}
          </ClientMotionDiv>
        </div>

        {/* 功能特性列表 */}
        {features && (
          <ClientMotionDiv
            className="mt-16 grid gap-px overflow-hidden rounded-lg border bg-input md:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {features.map(({ icon, title, description }, i) => {
              // 动态获取图标组件
              const Icon = (LucideIcons as any)[icon] || LucideIcons.Globe

              return (
                <div key={i} className="flex flex-col gap-3 bg-background p-5 md:gap-6">
                  <Icon className="size-6 shrink-0" />
                  <div>
                    <h2 className="text-sm font-semibold md:text-base">{title}</h2>
                    <p className="text-sm text-muted-foreground md:text-base">{description}</p>
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
