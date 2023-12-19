import { WeekDay } from "@prisma/client"
import moment from "moment-timezone"

moment.tz.setDefault("Europe/Istanbul")

interface TimeRange {
  start: string
  end: string
}

export function generateSlotTimes(
  selectedDays: WeekDay[],
  timeRanges: { [key in WeekDay]?: TimeRange[] },
  weeksDuration: number,
  meetingDuration: number
) {
  let slots: { startTime: string; endTime: string }[] = []

  selectedDays.forEach((day) => {
    for (let week = 0; week < weeksDuration; week++) {
      const dayTimeRanges = timeRanges[day]

      if (dayTimeRanges) {
        dayTimeRanges.forEach((timeRange) => {
          let startTime = getNextDateForDay(day, week).set({
            hour: parseInt(timeRange.start.split(":")[0]),
            minute: parseInt(timeRange.start.split(":")[1]),
          })
          const endTime = getNextDateForDay(day, week).set({
            hour: parseInt(timeRange.end.split(":")[0]),
            minute: parseInt(timeRange.end.split(":")[1]),
          })

          while (startTime.isBefore(endTime)) {
            const slotEndTime = moment(startTime).add(
              meetingDuration,
              "minutes"
            )
            if (slotEndTime.isAfter(endTime)) {
              break
            }
            slots.push({
              startTime: startTime.toISOString(),
              endTime: slotEndTime.toISOString(),
            })
            startTime = slotEndTime
          }
        })
      }
    }
  })

  return slots
}

function getNextDateForDay(day: WeekDay, weekOffset: number): moment.Moment {
  const dayMapping: { [key in WeekDay]: number } = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6,
  }

  const targetDayIndex = dayMapping[day]
  const currentDate = moment().tz("Europe/Istanbul").startOf("day")
  let currentDayIndex = (currentDate.day() + 6) % 7
  let daysToAdd = (targetDayIndex - currentDayIndex + 7) % 7
  return currentDate.add(daysToAdd + 7 * weekOffset, "days")
}
