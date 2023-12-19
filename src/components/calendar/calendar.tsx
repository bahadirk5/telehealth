"use client"

import dayGridPlugin from "@fullcalendar/daygrid"
import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import moment from "moment"

import "moment/locale/tr"
import "./calendar-style.css"

import { WeekDay } from "@prisma/client"

interface TimeSlot {
  startTime: string
  endTime: string
}

interface SelectedDay {
  day: WeekDay
  timeSlots: TimeSlot[]
}

interface Schedule {
  selectedDays: SelectedDay[]
}

interface EventCalendarProps {
  schedule: Schedule
}

function transformSelectedDaysToEvents(selectedDays: SelectedDay[]): any[] {
  const dayMapping = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 0,
  }

  let events: any = []
  selectedDays.forEach((daySchedule) => {
    const dayIndex = dayMapping[daySchedule.day]
    daySchedule.timeSlots.forEach((timeSlot) => {
      const currentDate = moment().isoWeekday(dayIndex) // Use isoWeekday for correct day mapping
      const startDateTime = currentDate.clone().set({
        hour: parseInt(timeSlot.startTime.split(":")[0]),
        minute: parseInt(timeSlot.startTime.split(":")[1]),
      })
      const endDateTime = currentDate.clone().set({
        hour: parseInt(timeSlot.endTime.split(":")[0]),
        minute: parseInt(timeSlot.endTime.split(":")[1]),
      })

      events.push({
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString(),
        display: "background",
      })
    })
  })

  return events
}

export function EventCalendar({ schedule }: EventCalendarProps) {
  const events = transformSelectedDaysToEvents(schedule.selectedDays)

  return (
    <FullCalendar
      locale="tr"
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="timeGridWeek"
      slotLabelFormat={{
        hour: "2-digit",
        minute: "2-digit",
      }}
      events={events}
    />
  )
}
