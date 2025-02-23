import { ClientMotionDiv } from '@/blocks/shared/components'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { FAQ1Fields } from '@/payload-types'

export default function FAQ1({ title, faqs }: FAQ1Fields) {
  return (
    <section className="py-32">
      <div className="container">
        <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-5xl">{title}</h1>
        <ClientMotionDiv
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {faqs?.map((faq, index) => (
            <Accordion key={faq.id || index} type="single" collapsible>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="hover:text-foreground/60 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </ClientMotionDiv>
      </div>
    </section>
  )
}
