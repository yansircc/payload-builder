import { Media } from '@/components/Media'
import { Feature13Fields } from '@/payload-types'

export default function Feature13({ title, features }: Feature13Fields) {
  return (
    <section className="py-32">
      <div className="container max-w-7xl">
        <h2 className="text-3xl font-medium lg:text-4xl">{title}</h2>
        <div className="mt-20 grid gap-9 lg:grid-cols-2">
          {features?.map((feature, index) => (
            <div key={index} className="flex flex-col justify-between rounded-lg bg-accent">
              <div className="flex justify-between gap-10 border-b">
                <div className="flex flex-col justify-between gap-14 py-6 pl-4 md:py-10 md:pl-8 lg:justify-normal">
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                  <h3 className="text-2xl md:text-4xl">{feature.title}</h3>
                </div>
                {feature.image && (
                  <div className="md:1/3 w-2/5 shrink-0 rounded-r-lg border-l">
                    <Media resource={feature.image} imgClassName="h-full w-full object-cover" />
                  </div>
                )}
              </div>
              <div className="p-4 text-muted-foreground md:p-8">{feature.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
