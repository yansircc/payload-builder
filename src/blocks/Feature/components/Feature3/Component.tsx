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
          <h1 className="mb-6 text-pretty text-4xl font-semibold lg:text-5xl">{title}</h1>

          <div
            className={cn(
              'mt-10 grid gap-3',
              features?.length === 1
                ? 'w-full max-w-md'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
            )}
          >
            {features?.map((item, index) => (
              <Card key={index} className="border-card/10 w-full">
                <CardHeader className="pb-1">
                  {item.icon && (
                    <span className="flex size-12 items-center justify-center rounded-full bg-white/90 shadow-sm">
                      <DynamicIcon name={item.icon} className="size-6 text-primary" />
                    </span>
                  )}
                </CardHeader>
                <CardContent className="text-left">
                  <h2 className="mb-1 text-lg font-semibold text-foreground">{item.title}</h2>
                  <p className="leading-snug text-foreground">{item.description}</p>
                </CardContent>
                {item.image && (
                  <CardFooter className="p-0 mt-4">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Media
                        fill
                        imgClassName="object-cover rounded-b-lg "
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
