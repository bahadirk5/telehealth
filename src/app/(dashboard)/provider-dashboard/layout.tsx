import { DesktopSidebar } from "@/components/dashboard/desktop-sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DesktopSidebar />
      <div className="lg:pl-72">
        <div className="flex flex-col space-y-12 p-8">{children}</div>
      </div>
    </>
  )
}
