"use client"

import React, { useState } from "react"
import { createSlots } from "@/actions/create-slot/create-slot"
import { Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"

import { useAction } from "@/hooks/use-action"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { Button } from "./ui/button"

type TimePeriod = { start: string; end: string }
type TimeRanges = { [key in string]: TimePeriod[] }

interface ScheduleState {
  selectedDays: string[]
  timeRanges: TimeRanges
  weeksDuration: number
  meetingDuration: number
}

const defaultState: ScheduleState = {
  selectedDays: [],
  timeRanges: {},
  weeksDuration: 4,
  meetingDuration: 30,
}

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

export function CalendarConfigForm() {
  const { pending } = useFormStatus()
  const [schedule, setSchedule] = useState(defaultState)
  const { execute } = useAction(createSlots, {
    onSuccess: (data) => {
      console.log(data, "SUCCESS")
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const handleDaySelection = (day: string) => {
    setSchedule((prev) => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(day)
        ? prev.selectedDays.filter((d) => d !== day)
        : [...prev.selectedDays, day],
    }))
  }

  const addTimePeriod = (day: string) => {
    setSchedule((prev) => ({
      ...prev,
      timeRanges: {
        ...prev.timeRanges,
        [day]: prev.timeRanges[day]
          ? [...prev.timeRanges[day], { start: "09:00", end: "10:00" }]
          : [{ start: "09:00", end: "10:00" }],
      },
    }))
  }

  const handleTimeChange = (
    day: string,
    index: number,
    startOrEnd: "start" | "end",
    value: string
  ) => {
    setSchedule((prev) => ({
      ...prev,
      timeRanges: {
        ...prev.timeRanges,
        [day]: prev.timeRanges[day].map((period, idx) =>
          idx === index ? { ...period, [startOrEnd]: value } : period
        ),
      },
    }))
  }

  const onSubmit = (formData: FormData) => {
    formData.append("selectedDays", JSON.stringify(schedule.selectedDays))
    formData.append("timeRanges", JSON.stringify(schedule.timeRanges))

    // Retrieve and parse the values
    const selectedDaysValue = formData.get("selectedDays")
    const timeRangesValue = formData.get("timeRanges")

    // Parse the JSON string back into the respective object/array
    const selectedDays = selectedDaysValue
      ? JSON.parse(selectedDaysValue as string)
      : []
    const timeRanges = timeRangesValue
      ? JSON.parse(timeRangesValue as string)
      : {}

    // Convert to numbers with proper fallback
    const weeksDuration = Number(formData.get("weeksDuration"))
    const meetingDuration = Number(formData.get("meetingDuration"))

    execute({ selectedDays, timeRanges, weeksDuration, meetingDuration })
  }

  return (
    <form action={onSubmit}>
      <div className="container space-y-4">
        {weekdays.map((day) => (
          <div key={day} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch
                disabled={pending}
                checked={schedule.selectedDays.includes(day)}
                onCheckedChange={() => handleDaySelection(day)}
              />
              <Label htmlFor={`day-${day}`}>{day}</Label>
            </div>
            {schedule.selectedDays.includes(day) && (
              <div className="space-y-2">
                {schedule.timeRanges[day]?.map((period, index) => (
                  <div key={index}>
                    <input
                      type="time"
                      name={`start-${day}-${index}`}
                      value={period.start}
                      disabled={pending}
                      onChange={(e) =>
                        handleTimeChange(day, index, "start", e.target.value)
                      }
                    />
                    <input
                      type="time"
                      name={`end-${day}-${index}`}
                      disabled={pending}
                      value={period.end}
                      onChange={(e) =>
                        handleTimeChange(day, index, "end", e.target.value)
                      }
                    />
                  </div>
                ))}
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => addTimePeriod(day)}
                  className="mt-5"
                >
                  Add Time Period
                </Button>
              </div>
            )}
          </div>
        ))}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="weeksDuration">Weeks Duration</Label>
          <Input
            id="weeksDuration"
            type="number"
            name="weeksDuration"
            disabled={pending}
            value={schedule.weeksDuration}
            onChange={(e) =>
              setSchedule((prev) => ({
                ...prev,
                weeksDuration: parseInt(e.target.value),
              }))
            }
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="meetingDuration">Meeting Duration (minutes)</Label>
          <Input
            id="meetingDuration"
            type="number"
            name="meetingDuration"
            value={schedule.meetingDuration}
            disabled={pending}
            onChange={(e) =>
              setSchedule((prev) => ({
                ...prev,
                meetingDuration: parseInt(e.target.value),
              }))
            }
          />
        </div>
        <Button type="submit" aria-disabled={pending}>
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </div>
    </form>
  )
}
