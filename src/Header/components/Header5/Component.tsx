'use client'

import { MenuIcon } from 'lucide-react'
import { Media } from '@/components/Media'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
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
import { Header5Fields } from '@/payload-types'

export default function Header5({ header }: Header5Fields) {
  const { logo, menu, title } = header
  return (
    <section className="py-4">
      <div className="container">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {logo && <Media resource={logo} imgClassName="w-8" priority alt="logo" />}
            <span className="text-lg font-semibold">{title}</span>
          </div>

          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {menu?.map((menuItem) => (
                <NavigationMenuItem key={menuItem.id}>
                  {menuItem.subMenus ? (
                    <>
                      <NavigationMenuTrigger>{menuItem.parentLink.label}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[600px] grid-cols-2 p-3">
                          {menuItem.subMenus.map((subItem) => (
                            <NavigationMenuLink
                              key={subItem.id}
                              href={subItem.link.url || '#'}
                              className="rounded-md p-3 transition-colors hover:bg-muted/70"
                            >
                              <div>
                                <p className="mb-1 font-semibold">{subItem.link.label}</p>
                                {subItem.description && (
                                  <p className="text-sm text-muted-foreground">
                                    {subItem.description}
                                  </p>
                                )}
                              </div>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink
                      href={menuItem.parentLink.url || '#'}
                      className={navigationMenuTriggerStyle()}
                    >
                      {menuItem.parentLink.label}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            <Button variant="outline">Sign in</Button>
            <Button>Start for free</Button>
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-scroll">
              <SheetHeader>
                <SheetTitle>
                  <div className="flex items-center gap-4">
                    {logo && <Media resource={logo} imgClassName="w-8" priority alt="logo" />}
                    <span className="text-lg font-semibold">{title}</span>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col">
                <Accordion type="single" collapsible className="mb-2 mt-4">
                  <AccordionItem value="solutions" className="border-none">
                    <AccordionTrigger className="hover:no-underline">Features</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid md:grid-cols-2">
                        {/* {features.map((feature, index) => (
                          <a
                            href={feature.href}
                            key={index}
                            className="rounded-md p-3 transition-colors hover:bg-muted/70"
                          >
                            <div key={feature.title}>
                              <p className="mb-1 font-semibold">{feature.title}</p>
                              <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                          </a>
                        ))} */}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="flex flex-col gap-6">
                  <a href="#" className="font-medium">
                    Templates
                  </a>
                  <a href="#" className="font-medium">
                    Blog
                  </a>
                  <a href="#" className="font-medium">
                    Pricing
                  </a>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <Button variant="outline">Sign in</Button>
                  <Button>Start for free</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  )
}
