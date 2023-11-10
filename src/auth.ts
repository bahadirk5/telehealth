import { authConfig } from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcrypt"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

import { db } from "@/lib/db"
import type { User } from "@/lib/definitions"

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await db.user.findFirst({
      where: {
        email: email,
      },
    })

    if (!user) {
      throw new Error("Invalid credentials")
    }

    return user
  } catch (error) {
    console.error("Failed to fetch user:", error)
    throw new Error("Failed to fetch user.")
  }
}

export const { auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data

          const user = await getUser(email)
          if (!user) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)
          if (passwordsMatch) return user
        }

        console.log("Invalid credentials")
        return null
      },
    }),
  ],
})
