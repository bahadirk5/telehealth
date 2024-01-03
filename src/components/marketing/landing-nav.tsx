import Link from "next/link"

import ScrolledNav from "@/components/scrolled-nav"

import { MarketingNav } from "./marketing-nav"
import { ThemeToggle } from "../theme-toggle"
import { UserAccountNav } from "./user-account-nav"

export async function LandingNavbar() {

  return (
    <ScrolledNav>
      <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex flex-row items-center font-bold">
              <div className="mr-1">
                <span className="text-lg">Tele</span>
                <span className="text-lg text-primary">Health</span>
              </div>
            </Link>
            <MarketingNav />
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <ThemeToggle />
            <UserAccountNav />
          </div>
        </div>
      </div>
    </ScrolledNav>
  )
}
