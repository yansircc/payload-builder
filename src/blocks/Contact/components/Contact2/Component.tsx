import { Form } from '@/components/Form'
import type { Contact2Fields } from '@/payload-types'

export default function Contact2({ contact }: Contact2Fields) {
  const { title, description, list, form } = contact

  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                Contact Details
              </h3>
              <ul className="ml-4 list-disc">
                {list?.map((item, idx) => (
                  <li key={idx}>
                    <span
                      className="whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: item.text }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mx-auto w-full max-w-lg flex flex-col gap-6 rounded-xl border p-12 bg-background [.theme-neon_&]:bg-white [.theme-neon_&]:border-primary/30">
            <Form
              fields={form?.fields || []}
              submitLabel={form?.submitButton?.label}
              className="flex flex-col gap-8 text-foreground [.theme-neon_&]:text-black [.theme-neon_&]:placeholder-black/60"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
