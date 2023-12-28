import { WeekDay } from "@prisma/client"
import * as z from "zod"

import { db } from "@/lib/db"
import { getServerAuthSession } from "@/lib/auth"

const scheduleSchema = z.object({
  selectedDays: z.array(
    z.enum([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ])
  ),
  timeRanges: z.record(
    z.array(
      z.object({
        start: z.string().regex(/^\d{2}:\d{2}$/),
        end: z.string().regex(/^\d{2}:\d{2}$/),
      })
    )
  ),
})

interface TimeRange {
  start: string
  end: string
}

interface ScheduleRequestBody {
  selectedDays: WeekDay[]
  timeRanges: { [key in WeekDay]?: TimeRange[] }
}

export async function POST(req: Request) {
  try {
    const session = await getServerAuthSession()

    if (!session || session.user?.role !== "Provider") {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await req.json()
    const body = scheduleSchema.parse(json)

    let schedule = await db.schedule.findUnique({
      where: { providerId: session.user.id },
      include: {
        selectedDays: {
          include: {
            timeSlots: true,
          },
        },
      },
    })

    if (!schedule) {
      schedule = await db.schedule.create({
        data: {
          providerId: session.user.id,
          selectedDays: {
            create: createSelectedDaysData(body),
          },
        },
        include: {
          selectedDays: {
            include: {
              timeSlots: true,
            },
          },
        },
      })
    } else {
      await updateSchedule(schedule, body)
    }

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    console.error(error)
    return new Response(null, { status: 500 })
  }
}

function createSelectedDaysData(body: ScheduleRequestBody) {
  return body.selectedDays.map((day: WeekDay) => ({
    day,
    timeSlots: {
      create:
        body.timeRanges[day]?.map((timeRange) => ({
          startTime: timeRange.start,
          endTime: timeRange.end,
        })) ?? [],
    },
  }))
}

async function updateSchedule(schedule: any, body: any) {
  for (const day of schedule.selectedDays) {
    if (body.selectedDays.includes(day.day)) {
      const submittedTimeSlots = body.timeRanges[day.day]

      const timeSlotsToDelete = day.timeSlots.filter(
        (slot: any) =>
          !submittedTimeSlots.some(
            (submittedSlot: any) =>
              submittedSlot.start === slot.startTime &&
              submittedSlot.end === slot.endTime
          )
      )

      for (const slot of timeSlotsToDelete) {
        await db.timeSlot.delete({
          where: { id: slot.id },
        })
      }

      for (const submittedSlot of submittedTimeSlots) {
        const existingTimeSlot = day.timeSlots.find(
          (slot: any) =>
            slot.startTime === submittedSlot.start &&
            slot.endTime === submittedSlot.end
        )

        if (existingTimeSlot) {
          await db.timeSlot.update({
            where: { id: existingTimeSlot.id },
            data: {
              startTime: submittedSlot.start,
              endTime: submittedSlot.end,
            },
          })
        } else {
          await db.timeSlot.create({
            data: {
              startTime: submittedSlot.start,
              endTime: submittedSlot.end,
              selectedDayId: day.id,
            },
          })
        }
      }
    } else {
      await db.timeSlot.deleteMany({
        where: { selectedDayId: day.id },
      })
      await db.selectedDay.delete({
        where: { id: day.id },
      })
    }
  }

  const newDaysToAdd = body.selectedDays.filter(
    (day: any) =>
      !schedule.selectedDays.some(
        (scheduledDay: any) => scheduledDay.day === day
      )
  )

  for (const newDay of newDaysToAdd) {
    await db.selectedDay.create({
      data: {
        day: newDay,
        scheduleId: schedule.id,
        timeSlots: {
          create: body.timeRanges[newDay].map((timeRange: any) => ({
            startTime: timeRange.start,
            endTime: timeRange.end,
          })),
        },
      },
    })
  }
}
