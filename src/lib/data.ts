"use server"

import { getServerAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function getCurrentProvider() {
  const session = await getServerAuthSession()
  if (!session) return null

  return await db.user.findFirst({
    where: { id: session.user.id },
    include: {
      provider: {
        include: {
          imageGallery: true,
        },
      },
    },
  })
}

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

export async function getProviders() {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return await db.provider.findMany({
    select: {
      userId: true,
      specialty: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  })
}
