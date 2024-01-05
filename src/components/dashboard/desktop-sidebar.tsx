"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { SIDENAV_ITEMS } from "@/config/doctor-dashboard"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserNav } from "@/components/dashboard/user-nav"

export async function DesktopSidebar() {
  const pathname = usePathname()

  return (
    <aside className="relative hidden min-h-screen border-r border-border pb-12 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <Link
        href="/provider-dashboard"
        className="flex items-center gap-2 px-8 py-6 text-2xl font-semibold tracking-tight"
      >
        Tele Health
      </Link>
      <div className="space-y-4">
        <div className="px-6 py-2">
          <nav className="space-y-1">
            {SIDENAV_ITEMS.map((link, index) => (
              <Link
                key={index}
                href={link.path}
                className={cn(
                  buttonVariants({
                    variant: link.path === pathname ? "default" : "ghost",
                    size: "sm",
                  }),
                  "w-full justify-start"
                )}
              >
                {link.icon && <link.icon className="mr-2 h-4 w-4" />}
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-8 mx-6">
        <UserNav />
      </div>
    </aside>
  )
}
