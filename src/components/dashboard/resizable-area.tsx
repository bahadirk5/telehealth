"use client"

import * as React from "react"
import Link from "next/link"
import {
  DollarSign,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Nav } from "@/components/dashboard/nav"
import { UserNav } from "@/components/dashboard/user-nav"
import { SIDENAV_ITEMS } from "@/config/doctor-dashboard"

interface ResizableArea {
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
  children: React.ReactNode
}

export function ResizableArea({
  defaultLayout = [265, 1095],
  defaultCollapsed = false,
  navCollapsedSize,
  children,
}: ResizableArea) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`
        }}
        className="flex min-h-screen flex-col items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={(collapsed) => {
            setIsCollapsed(collapsed)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              collapsed
            )}`
          }}
          className={cn(
            "flex flex-col",
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div className="flex-grow">
            <div className="space-y-4">
              <div className="py-2">
                <div className="space-y-1">
                  <Link
                    href="/provider-dashboard"
                    className="flex items-center px-2 gap-2 py-6 text-2xl font-semibold tracking-tight"
                  >
                    {isCollapsed ? (
                      <DollarSign className="h-8 w-8 text-green-700 lg:ml-1" />
                    ) : (
                      <span className="flex items-center">
                        <DollarSign className="mr-1 h-8 w-8 text-green-700" />
                        TeleHealth
                      </span>
                    )}
                  </Link>
                  <Nav
                    isCollapsed={isCollapsed}
                    links={SIDENAV_ITEMS}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className={cn(
              "mb-8 flex h-[52px] w-full items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            <UserNav isCollapsed={isCollapsed} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
