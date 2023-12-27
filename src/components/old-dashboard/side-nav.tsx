"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"

import { DoctorDashboardItem } from "@/types/doctor-dasboard"
import { SIDENAV_ITEMS } from "@/config/doctor-dashboard"
import { cn } from "@/lib/utils"

const SideNav = () => {
  return (
    <div className="fixed hidden h-screen flex-1 border-r border-border md:flex md:w-72 md:flex-col md:justify-between">
      <div className="mt-10 flex w-full flex-col space-y-6">
        <Link
          href="/"
          className="flex h-12 w-full flex-row items-center justify-center space-x-3 md:justify-start md:px-6"
        >
          <span className="h-7 w-7 rounded-lg bg-zinc-300" />
          <span className="hidden text-xl font-bold md:flex">TeleHealth</span>
        </Link>
        <div className="flex flex-col space-y-2 md:px-6 ">
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />
          })}
        </div>
      </div>
      {/* User Menu at the bottom */}
      <div className="flex w-full flex-col border-t border-border p-6">
        <div className="flex items-center space-x-3">
          <span className="h-10 w-10 rounded-full bg-zinc-400" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">Tom Cook</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideNav

const MenuItem = ({ item }: { item: DoctorDashboardItem }) => {
  const pathname = usePathname()
  const [subMenuOpen, setSubMenuOpen] = useState(false)
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen)
  }

  return (
    <>
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={cn(
              "group flex w-full flex-row items-center justify-between rounded-lg px-3 py-2 hover:bg-secondary hover:text-primary",
              pathname.includes(item.path) && "bg-secondary text-primary"
            )}
          >
            <div className="flex flex-row items-center">
              <span className="flex scroll-m-20 font-semibold tracking-tight">
                {item.title}
              </span>
            </div>

            <div className={cn(subMenuOpen && "rotate-180", "flex")}>
              <ChevronDown className="h-6 w-6" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-6 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={cn(subItem.path === pathname && "text-primary")}
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
        <Link href={item.path}>
          <span
            className={cn(
              "group flex scroll-m-20 items-center rounded-md px-3 py-2 font-semibold tracking-tight hover:bg-secondary hover:text-primary",
              item.path === pathname && "bg-secondary text-primary"
            )}
          >
            <span>{item.title}</span>
          </span>
        </Link>
      )}
    </>
  )
}
