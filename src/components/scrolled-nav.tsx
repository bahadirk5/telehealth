"use client"

import { cn } from "@/lib/utils"
import useScroll from "@/hooks/use-scroll"

export default function ScrolledNav({
  children,
}: {
  children: React.ReactNode
}) {
  const scrolled = useScroll(80)

  return (
    <header
      className={cn(
        "sticky inset-x-0 top-0 z-30 w-full border-b transition-all",
        {
          "bg-background/75 backdrop-blur-lg": scrolled,
        }
      )}
    >
      {children}
    </header>
  )
}
