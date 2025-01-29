import { Contact7Fields } from '@/payload-types'
import { DynamicIcon } from '@/components/DynamicIcon'
import { CMSLink } from '@/components/Link'

export default function Contact7({ contact }: Contact7Fields) {
  const { title, subtitle, description, supportList } = contact

  return (
    <section className="py-32">
      <div className="container">
        <div className="mb-14">
          <span className="text-sm font-semibold">{subtitle}</span>
          <h1 className="mb-3 mt-1 text-balance text-3xl font-semibold md:text-4xl">{title}</h1>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {supportList?.supports?.map((support, idx) => (
            <div key={idx}>
              <span className="mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-accent">
                {support.icon && <DynamicIcon name={support.icon} className="h-6 w-auto" />}
              </span>
              <p className="mb-2 text-lg font-semibold">{support.title}</p>
              <p className="mb-3 text-muted-foreground">{support.subtitle}</p>
              {support.link && (
                <CMSLink {...support.link} className="font-semibold hover:underline w-fit" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
