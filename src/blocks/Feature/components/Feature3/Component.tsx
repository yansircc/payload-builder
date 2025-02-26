import { DynamicIcon } from '@/components/DynamicIcon'
import { Media } from '@/components/Media'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import type { Feature3Fields } from '@/payload-types'
import { cn } from '@/utilities/ui'

export default function Feature3({ title, features }: Feature3Fields) {
  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h1 className="mb-6 text-pretty text-4xl font-semibold lg:text-5xl ">{title}</h1>

          <div
            className={cn(
              'mt-10 grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3',
              features?.length === 1 && 'sm:grid-cols-1 lg:grid-cols-1',
            )}
          >
            {features?.map((item, index) => (
              <Card key={index} className="border-card/10">
                <CardHeader className="pb-1">
                  {item.icon && (
                    <span className="flex size-12 items-center justify-center rounded-full bg-card/10">
                      <DynamicIcon name={item.icon} className="size-6 text-primary" />
                    </span>
                  )}
                </CardHeader>
                <CardContent className="text-left">
                  <h2 className="mb-1 text-lg font-semibold text-foreground">{item.title}</h2>
                  <p className="leading-snug text-foreground">{item.description}</p>
                </CardContent>
                {item.image && (
                  <CardFooter className="justify-end pb-0 pr-0">
                    <div className="relative h-40 w-full">
                      <Media
                        fill
                        imgClassName="rounded-tl-md object-cover"
                        resource={item.image}
                        alt={item.title}
                      />
                    </div>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
