import { Form } from '@/components/Form'
import { Contact5Fields } from '@/payload-types'

export default function Contact5({ contact }: Contact5Fields) {
  const { title, subtitle, description, form } = contact

  return (
    <section className="py-32">
      <div className="container">
        <div className="mb-14 text-center">
          <span className="text-sm font-semibold">{subtitle}</span>
          <h1 className="mb-3 mt-1 text-3xl font-semibold md:text-4xl">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="mx-auto flex max-w-[464px] flex-col gap-6">
          <Form
            fields={form?.fields || []}
            submitLabel={form?.submitButton?.label}
            className="flex flex-col gap-6"
          />
        </div>
      </div>
    </section>
  )
}
