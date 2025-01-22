import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { ClientMotionDiv } from '@/heros/share/motion'

import type { Page } from '@/payload-types'
import { ChevronRight } from 'lucide-react'

type Hero8Data = NonNullable<NonNullable<Page['hero']>['hero8']>

export default function Hero8({ title, description, media, links }: Hero8Data) {
  return (
    <section className="py-32">
      <div className="overflow-hidden border-b border-muted">
        <div className="container">
          {/* 内容区域 */}
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <ClientMotionDiv
              className="z-10 items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* 标题 */}
              <h1 className="mb-8 text-pretty text-4xl font-medium lg:text-8xl">{title}</h1>

              {/* 描述文本 */}
              {description && (
                <p className="mx-auto max-w-screen-md text-muted-foreground lg:text-xl">
                  {description}
                </p>
              )}

              {/* 按钮组 */}
              {links && links.length > 0 && (
                <div className="mt-12 flex w-full flex-col justify-center gap-2 sm:flex-row">
                  {links.map(({ link }, i) => (
                    <CMSLink
                      key={i}
                      {...link}
                      className="w-full sm:w-auto"
                      suffixElement={<ChevronRight className="ml-2 h-4" />}
                    />
                  ))}
                </div>
              )}
            </ClientMotionDiv>
          </div>

          {/* 底部图片 */}
          <ClientMotionDiv
            className="mt-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Media
              resource={media}
              className="mx-auto max-h-[700px] w-full max-w-7xl rounded-t-lg shadow-lg"
              imgClassName="object-cover w-full h-full"
              priority
            />
          </ClientMotionDiv>
        </div>
      </div>
    </section>
  )
}
