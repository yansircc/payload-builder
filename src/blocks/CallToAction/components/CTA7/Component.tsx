import { CMSLink } from '@/components/Link'
import { DynamicIcon } from '@/components/DynamicIcon'
import type { CTA7Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'

export default function CTA7({ cta }: CTA7Fields) {
  const { title, subtitle, links, lists } = cta

  return (
    <section className="py-32">
      <div className="container">
        <div className="relative rounded-xl border border-border bg-accent px-6 py-8 2xl:grid 2xl:grid-cols-2 2xl:px-14 2xl:py-10">
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <svg
              fill="none"
              width={404}
              height={384}
              viewBox="0 0 404 384"
              aria-hidden="true"
              className="absolute left-full top-full -translate-x-2/3 -translate-y-1/2 rotate-[60deg]"
            >
              <defs>
                <pattern x={0} y={0} id="dots" width={16} height={16} patternUnits="userSpaceOnUse">
                  <circle cx={2} cy={2} r={2} fill="currentColor" className="text-border" />
                </pattern>
              </defs>
              <rect fill="url(#dots)" width={400} height={400} />
            </svg>
          </div>
          <div className="relative mb-12 2xl:mb-0">
            <h3 className="mb-6 text-2xl font-semibold md:mb-8 md:text-4xl lg:mb-12">{title}</h3>
            {subtitle && (
              <p className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">
                {subtitle}
              </p>
            )}
            <ul className={`grid gap-x-8 gap-y-4 text-muted-foreground md:grid-cols-2`}>
              {lists?.map((list, index) => (
                <li key={index} className="flex items-center gap-2">
                  <DynamicIcon name={list.icon} className="size-5" />
                  {list.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative flex items-end 2xl:justify-end">
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
        </div>
      </div>
    </section>
  )
}
