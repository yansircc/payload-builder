import { ClientMotionDiv, ThemeEffect } from '@/blocks/shared'
import { DynamicIcon } from '@/components/DynamicIcon'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Feature2Fields } from '@/payload-types'

export default function Feature2({ title, description, icon, image, buttonGroup }: Feature2Fields) {
  return (
    <section className="py-32">
      <ThemeEffect />
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <ClientMotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {image && (
              <div className="relative h-full w-full rounded-lg overflow-hidden [.theme-neon_&]:border [.theme-neon_&]:border-primary/30">
                <Media
                  className="max-h-96 w-full object-cover"
                  priority
                  resource={image}
                  alt={title}
                />
              </div>
            )}
          </ClientMotionDiv>

          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {icon && (
              <ClientMotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-card/10">
                  <DynamicIcon
                    name={icon}
                    className="size-6 text-foreground [.theme-neon_&]:text-black"
                  />
                </span>
              </ClientMotionDiv>
            )}

            <ClientMotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="my-6 text-pretty text-3xl font-bold lg:text-4xl text-foreground [.theme-neon_&]:text-black">
                {title}
              </h1>
              <p className="mb-8 max-w-xl text-muted-foreground lg:max-w-none lg:text-lg [.theme-neon_&]:text-black/80">
                {description}
              </p>
            </ClientMotionDiv>

            {buttonGroup && buttonGroup.length > 0 && (
              <ClientMotionDiv
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                {buttonGroup.map((linkGroup, index) => (
                  <div key={index} className="flex flex-col gap-2 sm:flex-row">
                    <CMSLink
                      {...linkGroup.link}
                      className="px-6 py-3 rounded-lg font-medium transition-all
                        bg-card/100 text-foreground hover:bg-primary/20"
                    />
                  </div>
                ))}
              </ClientMotionDiv>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
