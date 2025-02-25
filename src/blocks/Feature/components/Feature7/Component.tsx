import { ClientMotionDiv, ThemeEffect } from '@/blocks/shared'
import { DynamicIcon } from '@/components/DynamicIcon'
import { Media } from '@/components/Media'
import { Feature7Fields } from '@/payload-types'

export default function Feature7({ title, description, icon, image, features }: Feature7Fields) {
  return (
    <section className="relative overflow-hidden  py-16 md:py-24">
      <ThemeEffect />
      <div className="container relative z-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <ClientMotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative aspect-[4/3] lg:aspect-[3/4]"
          >
            {image && (
              <Media
                resource={image}
                className="h-full w-full rounded-md object-cover"
                alt={title}
                priority
              />
            )}
          </ClientMotionDiv>

          <div className="flex flex-col lg:items-start">
            {icon && (
              <ClientMotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-card/80">
                  <DynamicIcon name={icon} className="size-6 text-primary" />
                </span>
              </ClientMotionDiv>
            )}

            <ClientMotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="my-6 text-pretty text-3xl font-bold lg:text-4xl text-muted-foreground">
                {title}
              </h1>
              <p className="mb-8 max-w-xl text-muted-foreground lg:text-lg">{description}</p>
            </ClientMotionDiv>

            {features && features.length > 0 && (
              <ClientMotionDiv
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <ul className="ml-4 space-y-4 text-left">
                  {features.map((item, index) => (
                    <ClientMotionDiv
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      <li className="flex items-center gap-3">
                        <DynamicIcon
                          name={item.icon || 'CheckCircle'}
                          className="size-6 text-primary"
                        />
                        <p className="text-muted-foreground lg:text-lg">{item.title}</p>
                      </li>
                    </ClientMotionDiv>
                  ))}
                </ul>
              </ClientMotionDiv>
            )}
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2">
        <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/60 to-background/20" />
      </div>
    </section>
  )
}
