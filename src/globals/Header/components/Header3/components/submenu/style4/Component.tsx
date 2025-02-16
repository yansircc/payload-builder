import { DynamicIcon } from '@/components/DynamicIcon'
import { Media } from '@/components/Media'
import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import { Header3Fields } from '@/payload-types'

type Style4Props = {
  data: NonNullable<NonNullable<Header3Fields['menu']>[number]['submenu']>
}
export default function Style4({ data }: Style4Props) {
  const { style4Config } = data
  return (
    <div className="flex gap-12">
      <div className="flex flex-1 flex-col">
        <div className="mb-10 text-xs uppercase tracking-widest text-muted-foreground">
          {style4Config?.leftSection.title}
        </div>
        <div className="grid flex-1 grid-cols-3 gap-6">
          {style4Config?.leftSection?.links?.map((item) => (
            <NavigationMenuLink
              key={item.id}
              href={item?.link?.url || '#'}
              className="flex h-full flex-col overflow-clip rounded-lg border border-input bg-background p-5 hover:bg-accent hover:text-accent-foreground xl:p-8"
            >
              <div className="mb-8">
                <DynamicIcon name="CircleCheckBig" className="size-6" />
              </div>
              <div className="mt-auto">
                <div className="mb-2 text-base">{item?.link?.title}</div>
                <div className="text-sm font-normal text-muted-foreground">
                  {item.link?.description}
                </div>
              </div>
            </NavigationMenuLink>
          ))}
        </div>
      </div>
      <div className="w-1/3 max-w-[404px]">
        <div className="mb-10 text-xs uppercase tracking-widest text-muted-foreground">
          {style4Config?.rightSection?.title}
        </div>
        {style4Config?.rightSection?.links?.map((item) => (
          <NavigationMenuLink
            key={item.id}
            href={item?.link?.url || '#'}
            className="mb-6 flex overflow-clip rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          >
            <div className="flex-1 p-5 xl:p-8">
              <div className="mb-2 text-base">{item.link?.title}</div>
              <div className="text-sm font-normal text-muted-foreground">
                {item.link?.description}
              </div>
            </div>
            <div className="w-1/3 max-w-[130px] shrink-0">
              {item.link?.image && (
                <Media
                  resource={item.link?.image}
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
