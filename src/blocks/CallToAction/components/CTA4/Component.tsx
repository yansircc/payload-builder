import { ClientMotionDiv } from '@/blocks/shared'
import { DynamicIcon } from '@/components/DynamicIcon'
import { CMSLink } from '@/components/Link'
import type { CTA4Fields } from '@/payload-types'

export default function CTA4({ title, subtitle, links, lists }: CTA4Fields) {
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-8 rounded-lg bg-accent p-6 md:flex-row lg:px-20 lg:py-16">
          <div className="w-full">
            <h4 className="mb-1 text-2xl font-bold md:text-3xl">{title}</h4>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}

            {/* Links */}
            {links && links.length > 0 && (
              <ClientMotionDiv
                className="flex w-full flex-col gap-2 sm:flex-row mt-6 lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {links.map((linkGroup, index) => (
                  <div key={index} className="w-full sm:w-auto">
                    {Object.entries(linkGroup).map(
                      ([key, link]) =>
                        link &&
                        typeof link === 'object' && (
                          <CMSLink key={key} {...link} className="w-full sm:w-auto" />
                        ),
                    )}
                  </div>
                ))}
              </ClientMotionDiv>
            )}
          </div>

          {/* Lists */}
          {lists && lists.length > 0 && (
            <div className="w-full">
              <ClientMotionDiv
                className="space-y-2 text-sm font-medium sm:text-base lg:text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {lists.map((item, index) => (
                  <li key={index} className="flex items-center">
                    {item.icon && <DynamicIcon name={item.icon} className="mr-4 size-5" />}
                    {item.text}
                  </li>
                ))}
              </ClientMotionDiv>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
