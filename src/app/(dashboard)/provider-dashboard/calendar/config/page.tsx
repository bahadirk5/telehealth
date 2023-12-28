import { WeekDay } from "@prisma/client"

import { getServerAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/old-dashboard/shell"

import { CalendarConfigForm } from "./_components/form"

type TimeSlot = {
  start: string
  end: string
}

type TransformedScheduleData = {
  selectedDays: WeekDay[]
  timeRanges: { [key in WeekDay]?: TimeSlot[] }
}

export default async function Config() {
  async function fetchSchedule() {
    "use server"

    const session = await getServerAuthSession()

    if (!session) return null

    const scheduleData = await db.schedule.findUnique({
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

    if (!scheduleData) return null

    const transformedData: TransformedScheduleData = {
      selectedDays: [],
      timeRanges: {},
    }

    scheduleData.selectedDays.forEach((day) => {
      transformedData.selectedDays.push(day.day)
      transformedData.timeRanges[day.day] = day.timeSlots.map((slot) => ({
        start: slot.startTime,
        end: slot.endTime,
      }))
    })

    return transformedData
  }

  const schedule = await fetchSchedule()

  const defaultFormValues: TransformedScheduleData = {
    selectedDays: [],
    timeRanges: {},
  }

  return (
    <>
      <DashboardHeader
        heading="Weekly Schedule Manager"
        text="Set and manage your weekly working hours easily."
      ></DashboardHeader>
      <div className="px-2">
        <CalendarConfigForm defaultValues={schedule || defaultFormValues} />
      </div>
    </>
  )
}
