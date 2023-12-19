"use server"

import { auth } from "@/auth"

import { db } from "./db"

export async function getSchedule() {
  const session = await auth()

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
