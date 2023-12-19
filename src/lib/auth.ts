import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { UserRole } from "@prisma/client"
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import { db } from "./db"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: UserRole
    } & DefaultSession["user"]
  }

  // interface User { 
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
      const dbUser = await db.user.findUnique({
        where: { id: user.id },
      })
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: dbUser?.role,
        },
      }
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
}

export const getServerAuthSession = () => getServerSession(authOptions)
