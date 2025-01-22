import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { ClientMotionDiv } from '@/heros/share/motion'
import { ArrowRight } from 'lucide-react'

import type { Page } from '@/payload-types'

type Hero34Data = NonNullable<NonNullable<Page['hero']>['hero34']>

export default function Hero34({ badge, title, description, media, links }: Hero34Data) {
  return (
    <section>
      <div className="container flex flex-col items-center">
        <div className="w-full overflow-clip rounded-lg bg-accent/50 2xl:w-[calc(min(100vw-2*theme(container.padding),100%+8rem))]">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* 左侧内容区域 */}
            <div className="container flex flex-col items-center px-[4rem] py-32 text-center lg:mx-auto lg:items-start lg:px-[4rem] lg:text-left">
              <ClientMotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex w-full flex-col items-center lg:items-start"
              >
                {/* 标签 */}
                {badge && <p>{badge}</p>}

                {/* 标题 */}
                <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">{title}</h1>

                {/* 描述 */}
                {description && (
                  <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">{description}</p>
                )}

                {/* 按钮组 */}
                {links && links.length > 0 && (
                  <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                    {links.map(({ link }, i) => (
                      <CMSLink
                        key={i}
                        {...link}
                        className="w-full sm:w-auto"
                        prefixElement={i === 0 ? <ArrowRight className="mr-2 size-4" /> : undefined}
                      />
                    ))}
                  </div>
                )}
              </ClientMotionDiv>
            </div>

            {/* 右侧图片 */}
            <ClientMotionDiv
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Media
                resource={media}
                className="h-full w-full"
                imgClassName="object-cover"
                priority
              />
            </ClientMotionDiv>
          </div>
        </div>
      </div>
    </section>
  )
}
