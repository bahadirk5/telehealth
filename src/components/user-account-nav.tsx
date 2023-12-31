"use client"

import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/user-avatar"

export function UserAccountNav() {
  const { data: session } = useSession()

  if (session?.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar
            user={{
              name: session.user.name as string,
              image: session.user.image || null,
            }}
            className="h-8 w-8"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <>
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                {session.user.name && (
                  <p className="font-medium">{session.user.name}</p>
                )}
                {session.user.email && (
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {session.user.email}
                  </p>
                )}
              </div>
            </div>
            <DropdownMenuSeparator />
            {session.user.role === "Provider" ? (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/provider-dashboard">Dashboard</Link>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/user-dashboard/reservations">
                    My reservations
                  </Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => signOut()}
            >
              Sign out
            </DropdownMenuItem>
          </>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return <Button size="sm" onClick={() => signIn("google")}>Login</Button>
}
