import { DynamicIcon } from '@/components/DynamicIcon'
import { Feature15Fields } from '@/payload-types'

export default function Feature15({ feature }: Feature15Fields) {
  const { title, subtitle, description, features } = feature

  return (
    <section className="py-32">
      <div className="container">
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:max-w-3xl md:text-center">
            <p className="text-sm text-muted-foreground">{subtitle}</p>
            <h2 className="text-3xl font-medium md:text-5xl">{title}</h2>
            <p className="text-muted-foreground md:max-w-2xl">{description}</p>
          </div>
        </div>
        <div className="mx-auto mt-20 grid max-w-5xl gap-6 md:grid-cols-2">
          {features?.map((feature, idx) => (
            <div
              className="flex flex-col justify-between rounded-lg bg-accent p-6 md:min-h-[300px] md:p-8"
              key={idx}
            >
              <span className="mb-6 flex size-11 items-center justify-center rounded-full bg-background">
                {feature.icon && <DynamicIcon name={feature.icon} className="size-6" />}
              </span>
              <div>
                <h3 className="text-lg font-medium md:text-2xl">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
