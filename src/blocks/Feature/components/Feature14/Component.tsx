import { DynamicIcon } from '@/components/DynamicIcon'
import { Media } from '@/components/Media'
import { Feature14Fields } from '@/payload-types'
import { cn } from '@/utilities/ui'

export default function Feature14({ features }: Feature14Fields) {
  return (
    <section className="py-32">
      <div className="container">
        <div className="space-y-10 rounded-lg border py-10 md:px-4">
          {features?.map((feature, index) => (
            <div
              key={index}
              className={cn(
                'grid rounded-lg border',
                feature.image ? 'md:grid-cols-2' : 'grid-cols-1',
              )}
            >
              <div
                className={cn(
                  'flex flex-col px-6 py-8 lg:px-8 lg:py-12 xl:px-12 xl:py-20',
                  !feature.image && 'max-w-4xl mx-auto w-full',
                )}
              >
                <h3 className="mb-3 text-2xl font-medium sm:mb-5 md:text-3xl lg:text-4xl">
                  {feature.title}
                </h3>
                <div className="mb-8 text-sm text-muted-foreground sm:mb-10 md:text-base">
                  {feature.description}
                </div>
                <ul className="mt-auto space-y-2 sm:space-y-3">
                  {feature.list?.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex gap-x-3">
                      {item.icon && (
                        <DynamicIcon name={item.icon} className="mt-0.5 size-4 shrink-0 sm:mt-1" />
                      )}
                      <p className="text-sm md:text-base">{item.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
              {feature.image && (
                <div className="relative order-first max-h-80 md:order-last md:max-h-[500px]">
                  <Media resource={feature.image} imgClassName="h-full w-full object-cover" />
                  <span className="absolute left-5 top-5 flex size-6 items-center justify-center rounded-sm bg-card/100 font-mono text-xs text-foreground md:left-10 md:top-10">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
