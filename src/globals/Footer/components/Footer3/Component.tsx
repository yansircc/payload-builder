import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Footer3Fields } from '@/payload-types'

export default function Footer3({ footer }: Footer3Fields) {
  const { sections, logo, rightLinks, copyright, socialLinks } = footer
  return (
    <section className="py-32">
      <div className="container">
        <footer>
          {logo && <Media resource={logo} imgClassName="h-7 w-fit" priority alt="logo" />}
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-4">
            {sections?.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links?.map((linkGroup, index) => (
                    <li key={index} className="font-medium hover:text-primary">
                      {linkGroup.link && (
                        <CMSLink {...linkGroup.link} className="text-muted-foreground h-auto p-0" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="lg:col-span-2 xl:col-span-1">
              <ul className="mb-10 flex items-center gap-2 text-muted-foreground">
                {socialLinks?.links?.map((linkGroup, index) => (
                  <li key={index} className="font-medium">
                    {linkGroup.link && (
                      <CMSLink
                        {...linkGroup.link}
                        className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary"
                      ></CMSLink>
                    )}
                  </li>
                ))}
              </ul>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Subscribe to our newsletter</Label>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input type="email" placeholder="Email" />
                  <Button type="submit">Subscribe</Button>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  By submitting, you agree to our Privacy Policy
                </p>
              </div>
            </div>
          </div>
          <div className="mt-24 flex flex-col flex-wrap justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {rightLinks?.links?.map((linkGroup, index) => (
                <li key={index} className="whitespace-nowrap underline hover:text-primary">
                  {linkGroup.link && <CMSLink {...linkGroup.link} />}
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  )
}
