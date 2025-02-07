import { ArrowUpRight } from 'lucide-react'
import { Media } from '@/components/Media'
import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import { Header3Fields } from '@/payload-types'

type Style3Props = {
  data: NonNullable<NonNullable<Header3Fields['menu']>[number]['submenu']>
}
export default function Style3({ data }: Style3Props) {
  const { style3Config } = data
  return (
    <div className="flex justify-between gap-x-12">
      <div className="w-1/3 max-w-[404px]">
        <div className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">
          {style3Config?.leftSection.title}
        </div>
        <div className="mb-[30px] text-sm font-normal text-muted-foreground">
          {style3Config?.leftSection.description}
        </div>
        <div className="-ml-2.5 space-y-2.5">
          {style3Config?.leftSection?.links?.map((item) => (
            <NavigationMenuLink
              key={item.id}
              href={item.link.url || '#'}
              className="group flex items-center gap-2.5 rounded-md p-2.5 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            >
              <div className="flex size-5 items-center justify-center rounded bg-accent group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowUpRight className="size-3" />
              </div>
              <div className="text-sm">{item.link.label}</div>
            </NavigationMenuLink>
          ))}
        </div>
      </div>
      <div className="max-w-[716px] flex-1 space-y-6">
        {style3Config?.rightSection?.links?.map((item) => (
          <NavigationMenuLink
            key={item.id}
            href={item?.link?.url || '#'}
            className="flex items-center overflow-clip rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          >
            <div className="flex-1 p-5 xl:p-8">
              <div className="mb-2 text-base">{item?.link?.title}</div>
              <div className="text-sm font-normal text-muted-foreground">
                {item?.link?.description}
              </div>
            </div>
            <div className="h-[154px] max-w-[264px] shrink-0">
              {item?.link?.image && (
                <Media
                  resource={item.link.image}
                  imgClassName="h-full w-full object-cover object-center"
                />
              )}
            </div>
          </NavigationMenuLink>
        ))}
      </div>
    </div>
  )
}
