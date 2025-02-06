import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Logos2Fields } from '@/payload-types'

import { ClientMotionDiv } from '../shared/motion'

export default function Logos2({ logos }: Logos2Fields) {
  const { title, description, logos: logoItems, link } = logos

  return (
    <section className="py-32">
      <div className="container">
        <div className="grid overflow-hidden rounded-xl border border-border md:grid-cols-2">
          <div className="my-auto px-6 py-10 sm:px-10 sm:py-12 lg:p-16">
            <div className="w-full md:max-w-md">
              {title && (
                <h2 className="mb-4 text-2xl font-semibold lg:text-3xl">
                  {title}
                </h2>
              )}
              {description && <p className="mb-6 text-lg">{description}</p>}
              {link && <CMSLink {...link} />}
            </div>
          </div>
          <div className="grid grid-cols-3 border-t border-border md:border-l md:border-t-0">
            {logoItems?.map((item, index) => (
              <ClientMotionDiv
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="-mb-px flex items-center justify-center border-b border-r border-border p-5 sm:p-6 [&:nth-child(3n)]:border-r-0"
              >
                <Media
                  resource={item.logo}
                  className="size-12 object-cover object-center sm:size-16 lg:size-24"
                  size="thumbnail"
                />
              </ClientMotionDiv>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
