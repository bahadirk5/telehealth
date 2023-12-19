import { LandingNavbar } from "@/components/landing-nav"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <LandingNavbar />
      {children}
    </>
  )
}
