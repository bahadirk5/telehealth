import { Separator } from "@/components/ui/separator"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { TopNav } from "@/components/dashboard/top-nav"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navItems = [
    {
      title: "Calendar",
      path: "/provider-dashboard/calendar",
      disabled: false,
    },
    {
      title: "Config",
      path: "/provider-dashboard/calendar/config",
      disabled: false,
    },
  ]
  return (
    <div className="flex max-w-screen-xl flex-col">
      <div className="flex flex-col space-y-6">
        <DashboardHeader
          heading="Weekly Schedule Manager"
          text="Set and manage your weekly working hours easily."
        ></DashboardHeader>
        <div className="space-y-4">
          <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            {navItems.map((item) => (
              <TopNav
                key={item.path}
                path={item.path}
                title={item.title}
                disabled={item.disabled}
              />
            ))}
          </div>
        </div>
        <Separator />
        {children}
      </div>
    </div>
  )
}
