import { DynamicIcon } from '@/components/DynamicIcon'
import { Media } from '@/components/Media'
import { ClientMotionDiv } from '../shared/motion'
import { ThemeEffect } from '../shared/ThemeEffect'

interface Feature7Fields {
  feature: {
    title: string
    description: string
    icon?: string
    image?: {
      id: string
      url: string
      updatedAt: string
      createdAt: string
    }
    features: Array<{
      icon?: string
      text: string
    }>
  }
}

export default function Feature7({ feature }: Feature7Fields) {
  const { title, description, icon, image, features } = feature

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <ThemeEffect />
      <div className="container relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
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

          <div className="flex flex-col lg:text-left">
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
              <p className="mb-8 max-w-xl text-muted-foreground lg:max-w-none lg:text-lg">
                {description}
              </p>
            </ClientMotionDiv>

            {features && features.length > 0 && (
              <ClientMotionDiv
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <ul className="ml-4 space-y-4 text-left">
                  {features.map((item: { icon?: string; text: string }, index: number) => (
                    <li key={index} className="flex items-center gap-3">
                      <DynamicIcon name={item.icon || 'CheckCircle'} className="size-6" />
                      <p className="text-muted-foreground lg:text-lg">{item.text}</p>
                    </li>
                  ))}
                </ul>
              </ClientMotionDiv>
            )}
          </div>
        </div>
      </div>

      {/* Decorative background */}
      <div className="absolute left-1/2 top-0 -z-10 h-full w-full -translate-x-1/2">
        <div className="absolute inset-0 bg-linear-to-tr from-background/80 via-background/60 to-background/20" />
      </div>
    </section>
  )
}
