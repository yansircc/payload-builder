'use client'
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import Style1 from './components/submenu/style1/Component'
import Style2 from './components/submenu/style2/Component'
import Style3 from './components/submenu/style3/Component'
import Style4 from './components/submenu/style4/Component'
import { Header3Fields } from '@/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { CMSLink } from '@/components/Link'
import renderMobileSubmenu from './utils/renderMobileSubmenu'

export default function Header3({ header, menu }: Header3Fields) {
  const { logo, rightLinks } = header
  const [open, setOpen] = useState(false)
  const [submenu, setSubmenu] = useState<string>('')
  const selectedSubmenu = menu?.find((item) => item.submenu?.style === submenu)
  return (
    <section className="inset-x-0 top-0 z-20 bg-background">
      <div className="container">
        <NavigationMenu className="min-w-full">
          <div className="flex w-full items-center justify-between gap-12 py-4">
            <div>
              {(!open || !submenu) && (
                <Link href="/">
                  <Media resource={logo} imgClassName="h-auto w-[125px]" />
                </Link>
              )}
              {open && submenu && (
                <Button variant="outline" onClick={() => setSubmenu('')}>
                  Back
                  <ChevronLeft className="ml-2 size-4" />
                </Button>
              )}
            </div>
            <NavigationMenuList className="hidden lg:flex">
              {menu?.map((item) => (
                <NavigationMenuItem key={item.id}>
                  <NavigationMenuTrigger>{item.parentMenu.label}</NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-[calc(100vw-4rem)] p-12 2xl:min-w-[calc(1400px-4rem)]">
                    {item.submenu?.style === 'style-1' && <Style1 data={item.submenu} />}
                    {item.submenu?.style === 'style-2' && <Style2 data={item.submenu} />}
                    {item.submenu?.style === 'style-3' && <Style3 data={item.submenu} />}
                    {item.submenu?.style === 'style-4' && <Style4 data={item.submenu} />}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
            <div className="hidden items-center gap-4 lg:flex">
              {rightLinks?.map((linkGroup, index) => (
                <div key={index}>
                  {Object.entries(linkGroup).map(
                    ([key, link]) =>
                      link && typeof link === 'object' && <CMSLink key={key} {...link} />,
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 lg:hidden">
              <Button
                variant="outline"
                size="icon"
                aria-label="Main Menu"
                onClick={() => {
                  if (open) {
                    setOpen(false)
                    setSubmenu('')
                  } else {
                    setOpen(true)
                  }
                }}
              >
                {!open && <Menu className="size-4" />}
                {open && <X className="size-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu (Root) */}
          {open && (
            <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden">
              <div>
                {menu?.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="flex w-full items-center border-b border-border px-8 py-7 text-left"
                    onClick={() => item.submenu?.style && setSubmenu(item.submenu?.style)}
                  >
                    <span className="flex-1">{item.parentMenu.label}</span>
                    <span className="shrink-0">
                      <ChevronRight className="size-4" />
                    </span>
                  </button>
                ))}
              </div>
              <div className="mx-[2rem] mt-auto flex flex-col gap-4 py-12">
                {rightLinks?.map((linkGroup, index) => (
                  <div key={index}>
                    {Object.entries(linkGroup).map(
                      ([key, link]) =>
                        link && typeof link === 'object' && <CMSLink key={key} {...link} />,
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {open &&
            submenu &&
            selectedSubmenu?.submenu &&
            renderMobileSubmenu({
              submenuData: selectedSubmenu?.submenu,
              style: submenu,
            })}
        </NavigationMenu>
      </div>
    </section>
  )
}
