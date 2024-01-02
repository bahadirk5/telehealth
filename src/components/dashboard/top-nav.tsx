"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface TopNavProps {
  path: string
  title: string
  disabled?: boolean
}

export function TopNav({ path, title, disabled }: TopNavProps) {
  const pathname = usePathname()
  return (
    <Link
      href={path}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        {
          "bg-background text-foreground shadow-sm": path === pathname,
          "pointer-events-none opacity-50": disabled,
        }
      )}
    >
      {title}
    </Link>
  )
}
