import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Footer6Fields } from '@/payload-types'

export default function Footer6({ footer }: Footer6Fields) {
  const { sections, title, subtitle, logo, rightLinks, copyright } = footer
  return (
    <footer className="py-16">
      <div className="container">
        <div className="relative mb-8 flex w-full flex-col gap-x-28 gap-y-8 md:flex-row md:justify-between md:gap-y-0">
          <div className="max-w-96">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-lg border border-border bg-accent p-2">
                {logo && (
                  <Media
                    resource={logo}
                    className="h-full w-full object-contain"
                    priority
                    alt="logo"
                  />
                )}
              </div>
              <h3 className="text-xl font-bold">{title}</h3>
            </div>
            <p className="text-base font-medium text-muted-foreground">
              {subtitle}
            </p>
          </div>
          <div className="flex flex-col items-start gap-x-20 gap-y-14 xl:flex-row">
            <div className="inline-grid w-fit grid-cols-1 gap-x-20 gap-y-14 sm:grid-cols-2">
              {sections?.map((section, sectionIdx) => (
                <div key={sectionIdx} className="h-fit w-min">
                  <h4 className="mb-6 whitespace-nowrap text-base font-semibold">
                    {section.title}
                  </h4>
                  <ul className="space-y-2 text-base font-medium">
                    {section.links?.map((linkGroup, index) => (
                      <li key={index}>
                        {linkGroup.link && (
                          <CMSLink
                            {...linkGroup.link}
                            className="whitespace-nowrap text-base hover:text-accent-foreground text-muted-foreground p-0 h-auto"
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="w-full shrink-0 sm:w-fit">
              <div className="mb-6 text-base font-semibold">
                Stay up to date
              </div>
              <form className="flex w-full flex-col justify-center gap-2 sm:flex-row">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  className="lg:min-w-72"
                />
                <Button>Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-baseline justify-between gap-8 border-t border-border pt-8 md:flex-row md:gap-16">
          <div className="text-xs text-muted-foreground sm:text-sm">
            {copyright}
          </div>
          <div className="flex flex-col items-start gap-4 text-xs text-muted-foreground sm:text-sm md:flex-row lg:items-center">
            {rightLinks?.links?.map((linkGroup, index) => (
              <div key={index}>
                {linkGroup.link && (
                  <CMSLink
                    {...linkGroup.link}
                    className="hover:text-accent-foreground"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
