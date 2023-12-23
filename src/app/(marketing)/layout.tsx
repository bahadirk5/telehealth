import { LandingNavbar } from "@/components/landing-nav"

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
