import { Menu } from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button, buttonVariants } from '@/components/ui/button'
import { CMSLink } from '@/components/Link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Header1Fields } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import { DynamicIcon } from '@/components/DynamicIcon'

export default function Header1({ header }: Header1Fields) {
  const { logo, menu, title } = header
  return (
    <section className="py-4">
      <div className="container">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              {logo && <Media resource={logo} imgClassName="w-8" priority alt="logo" />}
              <span className="text-lg font-semibold">{title}</span>
            </div>
            <div className="flex items-center">
              {menu?.map((menuItem) => {
                if (menuItem.subMenu && menuItem.subMenu.length > 0) {
                  return (
                    <NavigationMenu key={menuItem.id}>
                      <NavigationMenuList>
                        <NavigationMenuItem className="text-muted-foreground">
                          <NavigationMenuTrigger>
                            <span className="no-underline">{menuItem.parentLink.label}</span>
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="w-80 p-3">
                              <NavigationMenuLink>
                                {menuItem.subMenu.map((subItem, idx) => (
                                  <li key={idx}>
                                    <a
                                      className={cn(
                                        'flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                                      )}
                                      href="#"
                                    >
                                      {subItem?.link?.prefixIcon && (
                                        <DynamicIcon name={subItem.link.prefixIcon} />
                                      )}
                                      <div>
                                        <div className="text-sm font-semibold">
                                          {subItem.link.label}
                                        </div>
                                        <p className="text-sm leading-snug text-muted-foreground">
                                          {subItem.description}
                                        </p>
                                      </div>
                                    </a>
                                  </li>
                                ))}
                              </NavigationMenuLink>
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                  )
                }

                // For menu items without submenu
                return (
                  <CMSLink
                    key={menuItem.id}
                    {...menuItem.parentLink}
                    className={cn(
                      'no-underline',
                      'text-muted-foreground',
                      navigationMenuTriggerStyle,
                      buttonVariants({
                        variant: 'ghost',
                      }),
                    )}
                  />
                )
              })}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Log in
            </Button>
            <Button size="sm">Sign up</Button>
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {logo && <Media resource={logo} imgClassName="w-8" priority alt="logo" />}
              <span className="text-lg font-semibold">{title}</span>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center gap-2">
                      {logo && <Media resource={logo} imgClassName="w-8" priority alt="logo" />}
                      <span className="text-lg font-semibold">{title}</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="mb-6 mt-6 flex flex-col gap-4">
                  {menu?.map((menuItem) => {
                    if (menuItem.subMenu && menuItem.subMenu.length > 0) {
                      return (
                        <Accordion type="single" collapsible className="w-full" key={menuItem.id}>
                          <AccordionItem value={menuItem.id || ''} className="border-b-0">
                            <AccordionTrigger className="mb-4 py-0 font-semibold hover:no-underline">
                              {menuItem.parentLink.label}
                            </AccordionTrigger>
                            <AccordionContent className="mt-2">
                              <div className="grid">
                                {menuItem.subMenu.map((subItem) => (
                                  <a
                                    key={subItem.id}
                                    className={cn(
                                      'flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                                    )}
                                    href="#"
                                  >
                                    {subItem?.link?.prefixIcon && (
                                      <DynamicIcon name={subItem.link.prefixIcon} />
                                    )}
                                    <div>
                                      <div className="text-sm font-semibold">
                                        {subItem.link.label}
                                      </div>
                                      <p className="text-sm leading-snug text-muted-foreground">
                                        {subItem.description}
                                      </p>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )
                    }

                    // For menu items without submenu
                    return (
                      <CMSLink
                        key={menuItem.id}
                        {...menuItem.parentLink}
                        className="font-semibold no-underline text-base text-left w-fit p-0"
                      />
                    )
                  })}
                </div>
                <div className="border-t py-4"></div>
                <div className="flex flex-col gap-3">
                  <Button variant="outline">Log in</Button>
                  <Button>Sign up</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  )
}
