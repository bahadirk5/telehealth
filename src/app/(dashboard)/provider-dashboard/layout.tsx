import Header from "@/components/dashboard/header"
import HeaderMobile from "@/components/dashboard/header-mobile"
import MarginWidthWrapper from "@/components/dashboard/margin-width-wrapper"
import PageWrapper from "@/components/dashboard/page-wrapper"
import SideNav from "@/components/dashboard/side-nav"

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
          <Header />
          <HeaderMobile />
          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  )
}
