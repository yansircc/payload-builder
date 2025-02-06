import { CMSLink } from '@/components/Link'
import { Footer9Fields } from '@/payload-types'
import { CircleCheck } from 'lucide-react'

export default function Footer9({ footer }: Footer9Fields) {
  const {
    sections,
    title,
    subtitle,
    copyright,
    socialLinks,
    leftLinks,
    links,
  } = footer
  return (
    <section className="bg-gray-100 py-32">
      <div className="container">
        <footer>
          <div className="mb-14 flex flex-col justify-between gap-11 md:items-start xl:flex-row xl:items-center xl:gap-6">
            <div>
              <h1 className="mb-4 text-4xl font-semibold">{title}</h1>
              <p className="mb-8 text-xl text-muted-foreground">{subtitle}</p>
              <div className="flex items-center gap-3">
                {links?.map((linkGroup, index) => (
                  <div key={index}>
                    {linkGroup.link && <CMSLink {...linkGroup.link} />}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-between gap-6 rounded-2xl bg-white p-6 shadow-lg md:flex-row">
              <div className="flex flex-col items-center justify-center p-10">
                <div className="flex text-6xl font-semibold">
                  0<div className="h-full text-xl">€</div>
                </div>
                <div className="text-sm">Free forever</div>
              </div>
              <div className="h-[1px] w-full bg-muted-foreground/30 md:h-auto md:w-[1px]" />
              <ul className="flex flex-col justify-center space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2 font-medium hover:text-primary">
                  <CircleCheck className="h-5 w-5 text-primary" />
                  <p className="text-gray-400">1 Team Member</p>
                </li>
                <li className="flex items-center gap-2 font-medium hover:text-primary">
                  <CircleCheck className="h-5 w-5 text-primary" />
                  <p className="text-gray-400">Unlimited Downloads</p>
                </li>
                <li className="flex items-center gap-2 font-medium hover:text-primary">
                  <CircleCheck className="h-5 w-5 text-primary" />
                  <p className="text-gray-400">100GB Space</p>
                </li>
                <li className="flex items-center gap-2 font-medium hover:text-primary">
                  <CircleCheck className="h-5 w-5 text-primary" />
                  <p className="text-gray-400">Basic Support</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 border-t pt-20 lg:grid-cols-5">
            {sections?.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links?.map((linkGroup, index) => (
                    <li key={index} className="font-medium hover:text-primary">
                      {linkGroup.link && (
                        <CMSLink
                          {...linkGroup.link}
                          className="text-muted-foreground p-0"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t pt-8 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center">
            <ul className="flex justify-center items-center gap-4 lg:justify-start">
              {leftLinks?.links?.map((linkGroup, index) => (
                <li key={index} className="hover:text-primary">
                  {linkGroup.link && (
                    <CMSLink {...linkGroup.link} className="p-0 h-auto" />
                  )}
                </li>
              ))}
              <li>
                <p className="text-gray-400">{copyright}</p>
              </li>
            </ul>
            <ul className="flex items-center justify-center gap-4 lg:justify-start">
              <li>
                <p className="text-black">Follow us:</p>
              </li>
              {socialLinks?.links?.map((linkGroup, index) => (
                <li key={index}>
                  {linkGroup.link && (
                    <CMSLink
                      {...linkGroup.link}
                      className="gap-2 rounded-full"
                      appearance="outline"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  )
}
