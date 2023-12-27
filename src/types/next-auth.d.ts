import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth"
import { JWT } from "next-auth/jwt"

type UserId = string

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: UserId
      role: UserRole
    }
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: UserId
      role: UserRole
    } & DefaultSession["user"]
  }

  interface User {
    id: UserId
    role: UserRole
  }
}
