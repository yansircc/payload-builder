import { Media } from '@/components/Media'
import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import { Header3Fields } from '@/payload-types'
import { ArrowUpRight } from 'lucide-react'

type MobileSubmenuProps = {
  submenuData: NonNullable<
    NonNullable<Header3Fields['menu']>[number]['submenu']
  >
  style: string
}

export default function RenderMobileSubmenu({
  submenuData,
  style,
}: MobileSubmenuProps) {
  switch (style) {
    case 'style-1':
      return (
        <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden">
          <a
            href={submenuData?.style1Config?.leftSection?.link?.url || '#'}
            className="block space-y-6 px-8 py-8"
          >
            <div className="w-full overflow-clip rounded-lg">
              {submenuData?.style1Config?.leftSection?.link?.image && (
                <Media
                  resource={submenuData.style1Config.leftSection.link.image}
                  className="aspect-[2/1] h-full w-full object-cover object-center"
                />
              )}
            </div>
            <div>
              <div className="mb-2 text-base">
                {submenuData?.style1Config?.leftSection?.link?.title}
              </div>
              {submenuData?.style1Config?.leftSection?.link?.description && (
                <div className="text-sm font-normal text-muted-foreground">
                  {submenuData.style1Config.leftSection.link.description}
                </div>
              )}
            </div>
          </a>
          <div className="px-8 py-3.5 text-xs uppercase tracking-widest text-muted-foreground">
            {submenuData.style1Config?.rightSection.title}
          </div>
          <div className="border-t border-border pb-16">
            {submenuData.style1Config?.rightSection.links?.map(
              (item, index) => (
                <NavigationMenuLink
                  key={index}
                  href={item.link?.url || '#'}
                  className="group flex w-full items-start gap-x-4 border-b border-border px-8 py-7 text-left hover:bg-accent"
                >
                  <div>
                    <div className="mb-1.5 text-base">{item.link?.title}</div>
                    {item.link?.description && (
                      <div className="text-sm font-normal text-muted-foreground">
                        {item.link.description}
                      </div>
                    )}
                  </div>
                </NavigationMenuLink>
              )
            )}
          </div>
        </div>
      )
    case 'style-2':
      return (
        <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll bg-background lg:hidden">
          <div className="px-8 py-3.5 text-xs uppercase tracking-widest text-muted-foreground">
            {submenuData.style2Config?.leftSection.title}
          </div>
          <div>
            {submenuData.style2Config?.leftSection.links?.map((item, index) => (
              <NavigationMenuLink
                key={index}
                href={item.link.url || '#'}
                className="group flex w-full items-start gap-x-4 border-t border-border px-8 py-7 text-left hover:bg-accent"
              >
                <div className="text-base">{item.link.label}</div>
              </NavigationMenuLink>
            ))}
          </div>
          <div className="bg-secondary/30 px-8 pb-16 pt-8">
            {submenuData.style2Config?.rightSection?.link && (
              <>
                <div className="mb-7 text-xs uppercase tracking-widest text-muted-foreground">
                  {submenuData.style2Config.rightSection.link.subtitle}
                </div>
                <a
                  href={submenuData.style2Config.rightSection.link.url || '#'}
                  className="block space-y-6"
                >
                  <div className="overflow-clip rounded-lg">
                    {submenuData.style2Config.rightSection.link.image && (
                      <Media
                        resource={
                          submenuData.style2Config.rightSection.link.image
                        }
                        className="aspect-[2/1] h-full w-full object-cover object-center"
                      />
                    )}
                  </div>
                  <div>
                    <div className="mb-1.5 text-base">
                      {submenuData.style2Config.rightSection.link.title}
                    </div>
                    <div className="text-sm font-normal text-muted-foreground">
                      {submenuData.style2Config.rightSection.link.description}
                    </div>
                  </div>
                </a>
              </>
            )}
          </div>
        </div>
      )

    case 'style-3':
      return (
        <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden">
          <div className="px-8 py-8">
            <div className="mb-6 text-lg font-semibold">
              {submenuData.style3Config?.leftSection.title}
            </div>
            <div className="text-sm text-muted-foreground">
              {submenuData.style3Config?.leftSection.description}
            </div>
          </div>
          <div className="border-t border-border">
            {submenuData.style3Config?.leftSection.links?.map((item, index) => (
              <NavigationMenuLink
                key={index}
                href={item.link.url || '#'}
                className="group flex w-full items-center justify-between border-b border-border px-8 py-7 text-left hover:bg-accent"
              >
                <div className="text-base">{item.link.label}</div>
                <div className="text-muted-foreground">
                  <ArrowUpRight className="size-4" />
                </div>
              </NavigationMenuLink>
            ))}
          </div>
        </div>
      )

    case 'style-4':
      return (
        <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll bg-background lg:hidden">
          <div className="px-8 py-3.5 text-xs uppercase tracking-widest text-muted-foreground">
            {submenuData?.style4Config?.leftSection?.title}
          </div>
          <div>
            {submenuData.style4Config?.leftSection.links?.map((item, index) => (
              <NavigationMenuLink
                key={index}
                href={item?.link?.url || '#'}
                className="group flex w-full items-start gap-x-4 border-t border-border px-8 py-7 text-left hover:bg-accent"
              >
                <div>
                  <div className="mb-1.5 text-base">{item?.link?.title}</div>
                  {item?.link?.description && (
                    <div className="text-sm font-normal text-muted-foreground">
                      {item.link.description}
                    </div>
                  )}
                </div>
              </NavigationMenuLink>
            ))}
          </div>
          {submenuData.style4Config?.rightSection && (
            <div className="px-8 pb-16 pt-8">
              <div className="mb-7 text-xs uppercase tracking-widest text-muted-foreground">
                {submenuData.style4Config.rightSection.title}
              </div>
              {submenuData.style4Config?.rightSection?.links?.map((item) => (
                <a
                  key={item.id}
                  href={item.link?.url || '#'}
                  className="block space-y-6"
                >
                  <div className="overflow-clip rounded-lg">
                    {item?.link?.image && (
                      <Media
                        resource={item?.link?.image}
                        imgClassName="aspect-[2/1] h-full w-full object-cover object-center"
                      />
                    )}
                  </div>
                  <div>
                    <div className="mb-1.5 text-base">{item?.link?.title}</div>
                    <div className="text-sm font-normal text-muted-foreground">
                      {item?.link?.description}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      )

    default:
      return null
  }
}
