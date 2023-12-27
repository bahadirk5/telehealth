import { cookies } from "next/headers"

import { ResizableArea } from "@/components/dashboard/resizable-area"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const layout = cookies().get("react-resizable-panels:layout")
  const collapsed = cookies().get("react-resizable-panels:collapsed")

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

  return (
    <div className="flex">
      <ResizableArea
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={4}
      >
        <div className="min-h-screen">
          <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
            {children}
          </div>
        </div>
      </ResizableArea>
    </div>
  )
}
