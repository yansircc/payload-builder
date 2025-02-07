import { DynamicIcon } from '@/components/DynamicIcon'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Feature1Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'
import { ThemeEffect } from '../shared/ThemeEffect'

export default function Feature1({ feature }: Feature1Fields) {
  const { title, description, icon, image, links } = feature

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <ThemeEffect />
      <div className="container relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {icon && (
              <ClientMotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-accent">
                  <DynamicIcon name={icon} className="size-6" />
                </span>
              </ClientMotionDiv>
            )}

            <ClientMotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="my-6 text-pretty text-3xl font-bold lg:text-4xl">{title}</h1>
              <p className="mb-8 max-w-xl text-muted-foreground lg:text-lg">{description}</p>
            </ClientMotionDiv>

            {links && links.length > 0 && (
              <ClientMotionDiv
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                {links.map((linkGroup, index) => (
                  <div key={index} className="flex flex-col gap-2 sm:flex-row">
                    {Object.entries(linkGroup)
                      .filter(([key]) => key.startsWith('link-'))
                      .map(
                        ([key, link]) =>
                          link && typeof link === 'object' && <CMSLink key={key} {...link} />,
                      )}
                  </div>
                ))}
              </ClientMotionDiv>
            )}
          </div>

          <ClientMotionDiv
            className="relative aspect-square lg:aspect-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {image && (
              <div className="relative h-full w-full">
                <Media
                  fill
                  imgClassName="-z-10 object-cover"
                  priority
                  resource={image}
                  alt={title}
                />
              </div>
            )}
          </ClientMotionDiv>
        </div>
      </div>

      {/* Decorative background */}
      <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2">
        <div className="absolute inset-0 bg-linear-to-tr from-background/80 via-background/60 to-background/20" />
      </div>
    </section>
  )
}
