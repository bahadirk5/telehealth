"use server"

import { getServerAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function getSchedule() {
  const session = await getServerAuthSession()

  if (!session) return null

  return await db.schedule.findUnique({
    where: { providerId: session.user.id },
    select: {
      selectedDays: {
        select: {
          day: true,
          timeSlots: {
            select: {
              startTime: true,
              endTime: true,
            },
          },
        },
      },
    },
  })
}
