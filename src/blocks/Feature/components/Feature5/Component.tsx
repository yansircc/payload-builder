import { ClientMotionDiv, ThemeEffect } from '@/blocks/shared'
import { DynamicIcon } from '@/components/DynamicIcon'
import { Media } from '@/components/Media'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import type { Feature5Fields } from '@/payload-types'

export default function Feature5({ features, testimonial }: Feature5Fields) {
  return (
    <section className="py-32">
      <ThemeEffect />
      <div className="container">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features?.map((item, index) => {
            const isLarge = index === 0
            return (
              <ClientMotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={isLarge ? 'lg:col-span-2' : ''}
              >
                <Card className="flex h-full flex-col p-6">
                  <div className="flex flex-1 flex-col">
                    {item.icon && (
                      <ClientMotionDiv
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      >
                        <DynamicIcon name={item.icon} className="mb-1 w-7 text-primary" />
                      </ClientMotionDiv>
                    )}
                    <h2 className="mb-1 mt-4 text-lg font-semibold text-foreground">
                      {item.title}
                    </h2>
                    <p className="text-foreground">{item.description}</p>
                  </div>
                  {item.image && (
                    <ClientMotionDiv
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      className="mt-4"
                    >
                      <Media
                        resource={item.image}
                        className={`rounded-md object-cover ${
                          !isLarge
                            ? 'aspect-square lg:aspect-auto lg:h-[200px]'
                            : 'aspect-[16/9] max-h-[500px] w-full'
                        }`}
                        alt={item.title}
                      />
                    </ClientMotionDiv>
                  )}
                </Card>
              </ClientMotionDiv>
            )
          })}
        </div>

        {testimonial && (
          <ClientMotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-6 flex flex-col items-center gap-3"
          >
            <q className="max-w-2xl text-center text-2xl">{testimonial.quote}</q>
            <div className="flex flex-col items-center gap-2 leading-5 sm:flex-row">
              {testimonial.image && (
                <ClientMotionDiv
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  <Avatar className="size-9 rounded-full ring-1 ring-input">
                    <AvatarImage>
                      <Media resource={testimonial.image} alt={testimonial.name} />
                    </AvatarImage>
                  </Avatar>
                </ClientMotionDiv>
              )}
              <div className="text-center text-xs sm:text-left">
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </ClientMotionDiv>
        )}
      </div>
    </section>
  )
}
