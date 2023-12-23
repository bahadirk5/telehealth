"use client"

import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Icons } from "./icons"
import { UserAvatar } from "./user-avatar"


export function UserAccountNav() {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {session?.user ? (
          <UserAvatar
            user={{
              name: session.user.name as string,
              image: session.user.image || null,
            }}
            className="h-8 w-8"
          />
        ) : (
          <Avatar>
            <AvatarFallback>
              <Icons.user className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {session?.user ? (
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
        ) : (
          <>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => signIn("google")}
            >
              Login
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
