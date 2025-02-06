import { DynamicIcon } from '@/components/DynamicIcon'
import { Media } from '@/components/Media'
import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import { Header3Fields } from '@/payload-types'

type Style1Props = {
  data: NonNullable<NonNullable<Header3Fields['menu']>[number]['submenu']>
}

export default function Style1({ data }: Style1Props) {
  const { style1Config } = data
  return (
    <div className="flex items-start justify-between gap-x-12">
      <NavigationMenuLink
        key={style1Config?.leftSection?.link?.title}
        href={style1Config?.leftSection?.link?.url || '#'}
        className="group w-1/3 max-w-[398px]"
      >
        <div className="overflow-clip rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground">
          {style1Config?.leftSection?.link?.image && (
            <div>
              <Media
                resource={style1Config?.leftSection.link.image}
                imgClassName="h-[190px] w-[398px] object-cover object-center"
              />
            </div>
          )}
          <div className="p-5 xl:p-8">
            <div className="mb-2 text-base">
              {style1Config?.leftSection?.link?.title}
            </div>
            {style1Config?.leftSection?.link?.description && (
              <div className="text-sm font-normal text-muted-foreground">
                {style1Config.leftSection.link.description}
              </div>
            )}
          </div>
        </div>
      </NavigationMenuLink>
      <div className="max-w-[760px] flex-1 pt-2.5">
        <div className="mb-10 text-xs uppercase tracking-widest text-muted-foreground">
          {style1Config?.rightSection.title}
        </div>
        <div className="grid grid-cols-2 gap-8">
          {style1Config?.rightSection.links?.map((item, index) => (
            <NavigationMenuLink
              key={index}
              href={item.link?.url || '#'}
              className="group block"
            >
              <div className="mb-5 group-hover:opacity-60">
                {item.link?.prefixIcon && (
                  <DynamicIcon
                    name={item.link?.prefixIcon}
                    className="size-6"
                  />
                )}
              </div>
              <div className="mb-1 text-base">{item.link?.title}</div>
              {item.link?.description && (
                <div className="text-sm font-normal text-muted-foreground">
                  {item.link.description}
                </div>
              )}
            </NavigationMenuLink>
          ))}
        </div>
      </div>
    </div>
  )
}
