import { LandingNavbar } from "@/components/marketing/landing-nav"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <LandingNavbar />
      {children}
    </>
  )
}
