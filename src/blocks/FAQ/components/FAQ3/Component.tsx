import { CMSLink } from '@/components/Link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FAQ3Fields } from '@/payload-types'

export default function FAQ3({ faq }: FAQ3Fields) {
  const { title, subtitle, faqs, support } = faq
  return (
    <section className="py-32">
      <div className="container space-y-16">
        <div className="flex flex-col items-start text-left lg:items-center lg:text-center">
          <h2 className="mb-3 max-w-3xl text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
            {title}
          </h2>
          <p className="max-w-3xl text-muted-foreground lg:text-lg">
            {subtitle}
          </p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full lg:max-w-3xl"
        >
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
        <div className="flex w-full flex-col items-center rounded-lg bg-accent p-4 text-center md:rounded-xl md:p-6 lg:p-8">
          <div className="relative">
            <Avatar className="absolute mb-4 size-16 origin-bottom -translate-x-[60%] scale-[80%] border md:mb-5">
              <AvatarImage src="https://shadcnblocks.com/images/block/avatar-2.webp" />
              <AvatarFallback>SU</AvatarFallback>
            </Avatar>
            <Avatar className="absolute mb-4 size-16 origin-bottom translate-x-[60%] scale-[80%] border md:mb-5">
              <AvatarImage src="https://shadcnblocks.com/images/block/avatar-3.webp" />
              <AvatarFallback>SU</AvatarFallback>
            </Avatar>
            <Avatar className="mb-4 size-16 border md:mb-5">
              <AvatarImage src="https://shadcnblocks.com/images/block/avatar-1.webp" />
              <AvatarFallback>SU</AvatarFallback>
            </Avatar>
          </div>
          <h3 className="mb-2 max-w-3xl font-semibold lg:text-lg">
            {support.title}
          </h3>
          <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
            {support.subtitle}
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
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
