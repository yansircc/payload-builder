import { DynamicIcon } from '@/components/DynamicIcon'
import { Media } from '@/components/Media'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import type { Feature3Fields } from '@/payload-types'

export default function Feature3({ feature }: Feature3Fields) {
  const { title, features } = feature

  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h1 className="mb-6 text-pretty text-4xl font-semibold lg:text-5xl">{title}</h1>

          <div className="mt-10 grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features?.map((item, index) => (
              <Card key={index}>
                <CardHeader className="pb-1">
                  {item.icon && <DynamicIcon name={item.icon} className="size-4" />}
                </CardHeader>
                <CardContent className="text-left">
                  <h2 className="mb-1 text-lg font-semibold">{item.title}</h2>
                  <p className="leading-snug text-muted-foreground">{item.description}</p>
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
