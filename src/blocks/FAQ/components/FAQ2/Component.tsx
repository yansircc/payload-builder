import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { FAQ2Fields } from '@/payload-types'

export default function FAQ2({ faq }: FAQ2Fields) {
  const { title, faqs } = faq

  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col items-start text-left">
          <h2 className="mb-3 max-w-3xl text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
            {title}
          </h2>
        </div>
        <Accordion type="single" collapsible>
          {faqs?.map((item) => (
            <AccordionItem key={item.id} value={item.id || ''}>
              <AccordionTrigger>
                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="sm:mb-1 lg:mb-2">
                <div className="text-muted-foreground lg:text-lg">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
