import { DynamicIcon } from '@/components/DynamicIcon'
import { Media } from '@/components/Media'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import type { Feature5Fields } from '@/payload-types'

export default function Feature5({ feature }: Feature5Fields) {
  const { features, testimonial } = feature

  return (
    <section className="py-32">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features?.map((item, index) => {
            const isLarge = index === 0
            return (
              <Card
                key={index}
                className={`${isLarge ? 'lg:col-span-2' : ''} flex flex-col justify-between p-6`}
              >
                <div className="text-left">
                  {item.icon && (
                    <DynamicIcon name={item.icon} className="mb-1 w-7" />
                  )}
                  <h2 className="mb-1 mt-4 text-lg font-semibold">
                    {item.title}
                  </h2>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {item.image && (
                  <div className="mt-7">
                    <Media
                      resource={item.image}
                      className={`aspect-square rounded-t-md object-cover ${
                        !isLarge
                          ? 'lg:aspect-auto lg:h-full'
                          : 'max-h-[500px] w-full'
                      }`}
                      alt={item.title}
                    />
                  </div>
                )}
              </Card>
            )
          })}
        </div>

        {testimonial && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <q className="max-w-2xl text-center text-2xl">
              {testimonial.quote}
            </q>
            <div className="flex flex-col items-center gap-2 leading-5 sm:flex-row">
              {testimonial.image && (
                <Avatar className="size-9 rounded-full ring-1 ring-input">
                  <AvatarImage>
                    <Media
                      resource={testimonial.image}
                      alt={testimonial.name}
                    />
                  </AvatarImage>
                </Avatar>
              )}
              <div className="text-center text-xs sm:text-left">
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
