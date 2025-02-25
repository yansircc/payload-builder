import { DynamicIcon } from '@/components/DynamicIcon'
import { Feature10Fields } from '@/payload-types'

export default function Feature10({ title, description, features }: Feature10Fields) {
  return (
    <section className="py-32">
      <div className="container">
        <p className="mb-4 text-xs text-muted-foreground">{description}</p>
        <h2 className="text-3xl font-medium lg:text-4xl">{title}</h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {features?.map((feature, index) => (
            <div
              key={index}
              className="relative flex gap-3 rounded-lg border-dashed md:block md:border-l md:p-5"
            >
              <span
                className={`mb-8 flex shrink-0 items-center justify-center rounded-full md:size-12 ${
                  feature.icon ? 'size-10 bg-card/10' : 'hidden'
                }`}
              >
                {feature.icon && (
                  <DynamicIcon
                    name={feature.icon}
                    className="size-5 md:size-6 text-muted-foreground"
                  />
                )}
              </span>
              <div>
                <h3 className="font-medium md:mb-2 md:text-xl">
                  {feature.title}
                  <span className="absolute -left-px hidden h-6 w-px bg-primary md:inline-block"></span>
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
