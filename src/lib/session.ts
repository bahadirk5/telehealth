import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
  try {
    const session = await getSession()

    if (!session?.user?.email) {
      return null
    }

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    })

    if (!currentUser) {
      return null
    }

    return {
      ...currentUser,
    }
  } catch (error: any) {
    return null
  }
}
