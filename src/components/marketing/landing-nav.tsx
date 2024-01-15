import Link from "next/link"

import { Button } from "@/components/ui/button"
import { UserAccountNav } from "@/components/marketing/user-account-nav"
import ScrolledNav from "@/components/scrolled-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Clover } from "lucide-react"

export async function LandingNavbar() {
  return (
    <ScrolledNav>
      <div className="container mx-auto w-full">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex flex-row items-center font-bold">
              <div className="mr-1 flex gap-1 items-center">
                <Clover className="h-12 w-12" />
                <span className="text-xl">TeleHealth</span>
              </div>
            </Link>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <Button variant="outline">How it works</Button>
            <ThemeToggle />
            <UserAccountNav />
          </div>
        </div>
      </div>
    </ScrolledNav>
  )
}
