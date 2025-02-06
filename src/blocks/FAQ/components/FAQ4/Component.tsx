import { CMSLink } from '@/components/Link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { FAQ4Fields } from '@/payload-types'
import { ChevronRight } from 'lucide-react'

export default function FAQ4({ faq }: FAQ4Fields) {
  const { title, subtitle, description, faqs, support } = faq
  return (
    <section className="py-32">
      <div className="container">
        <div>
          <Badge className="text-xs font-medium">{subtitle}</Badge>
          <h1 className="mt-4 text-4xl font-semibold">{title}</h1>
          <p className="mt-6 font-medium text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="mt-12">
          <Accordion type="single" collapsible>
            {faqs?.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b-0"
              >
                <AccordionTrigger className="hover:text-foreground/60 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <Separator className="my-12" />
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
          <div className="lg:col-span-2">
            <h1 className="mt-4 text-2xl font-semibold">{support.title}</h1>
            <p className="mt-6 font-medium text-muted-foreground">
              {support.subtitle}
            </p>
          </div>
          <div className="flex md:justify-end">
            {support?.supportLink?.map((linkGroup, index) => (
              <div key={index} className="flex flex-col gap-2 sm:flex-row">
                {Object.entries(linkGroup).map(
                  ([key, link]) =>
                    link &&
                    typeof link === 'object' && <CMSLink key={key} {...link} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
