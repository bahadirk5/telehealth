import { UserRole } from "@prisma/client"
import { z } from "zod"

import { getServerAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"

const enrollSchema = z.object({
  specialty: z.string().min(2).max(30),
})

export async function POST(req: Request) {
  try {
    const session = await getServerAuthSession()

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
      })
    }

    const json = await req.json()
    const body = enrollSchema.parse(json)

    await db.$transaction(async (prisma) => {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { role: UserRole.Provider },
      })

      await prisma.provider.create({
        data: {
          userId: session.user.id,
          specialty: body.specialty,
        },
      })
    })

    return new Response(
      JSON.stringify({ message: "Provider enrollment successful" }),
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ errors: error.issues }), {
        status: 422,
      })
    }

    console.error(error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    })
  }
}
