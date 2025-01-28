import { CMSLink } from '@/components/Link'
import { DynamicIcon } from '@/components/Link/DynamicIcon'
import type { CTA4Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'

export default function CTA4({ cta }: CTA4Fields) {
  const { title, subtitle, links, lists } = cta

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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {links.map((linkGroup, index) => (
                  <div key={index}>
                    {Object.entries(linkGroup)
                      .filter(([key]) => key.startsWith('link-'))
                      .map(
                        ([key, link]) =>
                          link &&
                          typeof link === 'object' && (
                            <CMSLink key={key} className="mt-8 px-0 underline" {...link} />
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
                    <DynamicIcon name={item.icon} className="mr-4 size-5" />
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
