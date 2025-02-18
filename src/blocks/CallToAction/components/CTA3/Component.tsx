import Link from 'next/link'
import { DynamicIcon } from '@/components/DynamicIcon'
import { CMSLink } from '@/components/Link'
import { Card } from '@/components/ui/card'
import type { CTA3Fields } from '@/payload-types'
import { ClientMotionDiv } from '../shared/motion'

export default function CTA3({ title, subtitle, buttons, list }: CTA3Fields) {
  return (
    <section className="py-32">
      <div className="container">
        <div className="grid grid-cols-1 flex-col gap-10 rounded-lg border p-6 shadow-sm lg:grid-cols-2 lg:px-20 lg:py-16">
          <div>
            <h4 className="mb-2 text-2xl font-bold lg:text-4xl">{title}</h4>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}

            {/* Button Links */}
            {buttons && buttons.length > 0 && (
              <ClientMotionDiv
                className="mt-8 flex flex-col items-center gap-2 sm:flex-row"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                {buttons.map((linkGroup, index) => (
                  <div key={index} className="w-full sm:w-auto">
                    {Object.entries(linkGroup).map(
                      ([key, link]) =>
                        link &&
                        typeof link === 'object' && (
                          <CMSLink key={key} className="w-full sm:w-auto" {...link} />
                        ),
                    )}
                  </div>
                ))}
              </ClientMotionDiv>
            )}
          </div>

          {/* List Links */}
          {list && list.length > 0 && (
            <ClientMotionDiv
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {list.map((item, index) => (
                <Link key={index} href={item.link?.url || ''} className="block">
                  <Card className="flex bg-white items-center justify-between gap-2 px-6 py-4 shadow-none hover:bg-accent">
                    <div className="flex items-start gap-2">
                      {item.link.prefixIcon && (
                        <DynamicIcon name={item.link.prefixIcon} className="size-4" />
                      )}
                      <div>
                        <h5 className="mb-2 font-medium leading-4">{item.link.label}</h5>
                        {item.link.description && (
                          <p className="text-sm text-muted-foreground">{item.link.description}</p>
                        )}
                      </div>
                    </div>
                    {item.link.suffixIcon && (
                      <DynamicIcon name={item.link.suffixIcon} className="size-4" />
                    )}
                  </Card>
                </Link>
              ))}
            </ClientMotionDiv>
          )}
        </div>
      </div>
    </section>
  )
}
