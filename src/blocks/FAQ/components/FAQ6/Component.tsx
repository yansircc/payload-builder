import { Badge } from '@/components/ui/badge'
import { FAQ6Fields } from '@/payload-types'

export default function FAQ6({ faq }: FAQ6Fields) {
  const { title, subtitle, description, faqs } = faq
  return (
    <section className="py-32">
      <div className="container">
        <div className="text-center">
          <Badge className="text-xs font-medium">{subtitle}</Badge>
          <h1 className="mt-4 text-4xl font-semibold">{title}</h1>
          <p className="mt-6 font-medium text-muted-foreground">{description}</p>
        </div>
        <div className="mx-auto mt-14 grid gap-8 md:grid-cols-2 md:gap-12">
          {faqs?.map((faq, index) => (
            <div key={index} className="flex gap-4">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-secondary font-mono text-xs text-primary">
                {index + 1}
              </span>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium">{faq.question}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
