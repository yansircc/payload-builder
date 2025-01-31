import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Footer8Fields } from '@/payload-types'

export default function Footer8({ footer }: Footer8Fields) {
  const { sections, title, subtitle, logo, bottomText, socialLinks } = footer
  return (
    <section className="py-32">
      <div className="container">
        <footer>
          <div className="grid grid-cols-4 justify-between gap-10 lg:grid-cols-6 lg:text-left">
            <div className="col-span-4 flex w-full flex-col justify-between gap-6 lg:col-span-2">
              <div>
                <span className="flex items-center gap-4">
                  {logo && <Media resource={logo} className="h-11" priority alt="logo" />}
                  <p className="text-3xl font-semibold">{title}</p>
                </span>
                <p className="mt-6 text-muted-foreground">{subtitle}</p>
              </div>
              <ul className="flex items-center space-x-6">
                {socialLinks?.links?.map((linkGroup, index) => (
                  <li
                    key={index}
                    className="font-medium duration-200 hover:scale-110 hover:text-muted-foreground"
                  >
                    {linkGroup.link && (
                      <CMSLink {...linkGroup.link} className="flex items-center justify-center" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
            {sections?.map((section, sectionIdx) => (
              <div key={sectionIdx} className="col-span-2 md:col-span-1">
                <h3 className="mb-5 font-medium">{section.title}</h3>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {section.links?.map((linkGroup, index) => (
                    <li key={index} className="font-medium hover:text-primary">
                      {linkGroup.link && <CMSLink {...linkGroup.link} />}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-4 md:col-span-2">
              <h3 className="mb-5 font-medium">Newsletter</h3>
              <div className="grid gap-1.5">
                <Label htmlFor="email">Subscribe to our newsletter</Label>
                <div className="flex w-full items-center space-x-2">
                  <Input type="email" placeholder="Email" />
                  <Button type="submit">Subscribe</Button>
                </div>
              </div>
              <p className="mt-1 text-xs font-medium text-muted-foreground">
                By submitting, you agree to our
                <a href="#" className="ml-1 text-primary hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
          <div className="mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left">
            <p>{bottomText?.copyright}</p>
            <p>{bottomText?.description}</p>
          </div>
        </footer>
      </div>
    </section>
  )
}
