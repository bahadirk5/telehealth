"use client"

import Link from "next/link"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { ChevronsUpDown, LogOut, Monitor, Rocket } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserNav() {
  const { data: session } = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center justify-between gap-4 rounded px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-700">
        <div className="flex w-full items-center justify-start gap-4 ">
          <Avatar>
            {session?.user.image ? (
              <AvatarImage
                src={session.user.image}
                alt={session.user.name ?? "Profile picture"}
              />
            ) : null}
            <AvatarFallback className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-md border border-zinc-500 bg-zinc-100 text-zinc-700">
              {(session?.user.name ?? "").slice(0, 2).toUpperCase() ?? "P"}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">{session?.user.name}</span>
        </div>
        <ChevronsUpDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full lg:w-56" align="end" forceMount>
        <DropdownMenuGroup>
          <Link href="/">
            <DropdownMenuItem>
              <Rocket className="mr-2 h-4 w-4" />
              <span>Main site</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/room">
            <DropdownMenuItem>
              <Monitor className="mr-2 h-4 w-4" />
              <span>Room</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <button
              onClick={async () => {
                await signOut()
              }}
              className="w-full"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
