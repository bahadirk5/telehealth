"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"

import { DoctorDashboardItem } from "@/types/doctor-dasboard"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface NavProps {
  isCollapsed: boolean
  links: DoctorDashboardItem[]
}

export function Nav({ links, isCollapsed }: NavProps) {
  const pathname = usePathname()
  const [subMenuOpen, setSubMenuOpen] = React.useState(false)
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen)
  }

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.path}
                  className={cn(
                    buttonVariants({
                      variant: link.path === pathname ? "default" : "ghost",
                      size: "icon",
                    }),
                    "h-9 w-9",
                    link.path === pathname &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  {link.icon && <link.icon className="h-4 w-4" />}
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
              </TooltipContent>
            </Tooltip>
          ) : (
            <React.Fragment key={index}>
              {link.submenu ? (
                <>
                  <Button
                    onClick={toggleSubMenu}
                    variant={pathname.includes(link.path) ? "default" : "ghost"}
                    size="sm"
                    className="group items-center justify-between"
                  >
                    <span className="flex scroll-m-20 font-semibold tracking-tight">
                      {link.icon && <link.icon className="mr-2 h-4 w-4" />}
                      {link.title}
                    </span>
                    <div className={cn(subMenuOpen && "rotate-180", "flex")}>
                      <ChevronDown className="h-6 w-6" />
                    </div>
                  </Button>

                  {subMenuOpen && (
                    <div className="my-2 ml-6 flex flex-col space-y-4">
                      {link.subMenuItems?.map((subItem, idx) => {
                        return (
                          <Link
                            key={idx}
                            href={subItem.path}
                            className={cn(
                              subItem.path === pathname && "text-blue-700"
                            )}
                          >
                            <span className="text-sm font-semibold">
                              {subItem.title}
                            </span>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  key={index}
                  href={link.path}
                  className={cn(
                    buttonVariants({
                      variant: link.path === pathname ? "default" : "ghost",
                      size: "sm",
                    }),
                    link.path === pathname &&
                      "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                    "justify-start"
                  )}
                >
                  {link.icon && <link.icon className="mr-2 h-4 w-4" />}
                  {link.title}
                </Link>
              )}
            </React.Fragment>
          )
        )}
      </nav>
    </div>
  )
}
