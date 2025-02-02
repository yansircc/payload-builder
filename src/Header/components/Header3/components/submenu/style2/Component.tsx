import { DynamicIcon } from '@/components/DynamicIcon'
import { Media } from '@/components/Media'
import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import { Header3Fields } from '@/payload-types'

type Style2Props = {
  data: NonNullable<NonNullable<Header3Fields['menu']>[number]['submenu']>
}
export default function Style2({ data }: Style2Props) {
  const { style2Config } = data
  return (
    <div className="flex justify-between gap-x-[52px]">
      <div className="w-1/2 max-w-[510px] py-2.5">
        <div className="mb-10 text-xs uppercase tracking-widest text-muted-foreground">
          {style2Config?.leftSection.title}
        </div>
        <div className="grid grid-cols-2 gap-6">
          {style2Config?.leftSection.links?.map((item) => (
            <NavigationMenuLink
              key={item.id}
              href={item.link.url || '#'}
              className="group flex items-center gap-5"
            >
              <div className="group-hover:opacity-60">
                {item.link.prefixIcon && (
                  <DynamicIcon name={item.link.prefixIcon} className="size-6" />
                )}
              </div>
              <div className="text-base">{item.link.label}</div>
            </NavigationMenuLink>
          ))}
        </div>
      </div>
      <NavigationMenuLink
        href={style2Config?.rightSection?.link?.url || '#'}
        className="group max-w-[604px] flex-1"
      >
        <div className="flex h-full rounded-lg bg-secondary/30 group-hover:bg-secondary/80 group-focus:bg-secondary/80">
          <div className="w-2/5 max-w-[210px] shrink-0 overflow-clip rounded-lg">
            {style2Config?.rightSection?.link?.image && (
              <Media
                resource={style2Config?.rightSection?.link?.image}
                imgClassName="h-full w-full object-cover object-center"
              />
            )}
          </div>
          <div className="flex flex-col p-5 xl:p-8">
            <div className="mb-8 text-xs uppercase tracking-widest text-muted-foreground">
              {style2Config?.rightSection?.link?.subtitle}
            </div>
            <div className="mt-auto">
              <div className="mb-4 text-xl">{style2Config?.rightSection?.link?.title}</div>
              <div className="text-sm font-normal text-muted-foreground">
                {style2Config?.rightSection?.link?.description}
              </div>
            </div>
          </div>
        </div>
      </NavigationMenuLink>
    </div>
  )
}
