import Header from "@/components/old-dashboard/header"
import HeaderMobile from "@/components/old-dashboard/header-mobile"
import MarginWidthWrapper from "@/components/old-dashboard/margin-width-wrapper"
import PageWrapper from "@/components/old-dashboard/page-wrapper"
import SideNav from "@/components/old-dashboard/side-nav"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex">
      <SideNav />
      <main className="flex-1">
        <MarginWidthWrapper>
          {/* <Header /> */}
          {/* <HeaderMobile /> */}
          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  )
}
