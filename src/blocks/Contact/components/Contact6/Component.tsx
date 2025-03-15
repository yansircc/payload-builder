import { DynamicIcon } from '@/components/DynamicIcon'
import { Form } from '@/components/Form'
import { CMSLink } from '@/components/Link'
import { Contact6Fields } from '@/payload-types'

export default function Contact6({ contact }: Contact6Fields) {
  const { title, subtitle, description, supportList, form } = contact

  return (
    <section className="py-32">
      <div className="container">
        <div className="mb-14">
          <span className="text-sm font-semibold">{subtitle}</span>
          <h1 className="mb-3 mt-1 text-balance text-3xl font-semibold md:text-4xl">{title}</h1>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="grid gap-10 sm:grid-cols-2">
            {supportList?.supports?.map((support, idx) => (
              <div key={idx}>
                {support.icon && <DynamicIcon name={support.icon} className="mb-3 h-6 w-auto  " />}
                <p className="mb-2 text-lg font-semibold">{support.title}</p>
                <p className="mb-3 text-muted-foreground">{support.subtitle}</p>
                {support.link && (
                  <CMSLink {...support.link} className="font-semibold hover:underline w-fit" />
                )}
              </div>
            ))}
          </div>

          <div className="mx-auto flex w-full flex-col gap-6 rounded-lg bg-muted p-10 md:max-w-[464px]">
            <Form
              fields={form?.fields || []}
              submitLabel={form?.submitButton?.label}
              className="flex flex-col gap-8 text-foreground [.theme-neon_&]:text-black [.theme-neon_&]:placeholder-black/6"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
