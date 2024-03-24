"use client"

import * as React from "react"
import { Clock, DollarSign } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import { UserAvatar } from "@/components/user-avatar"

export function ReservationCard({
  name,
  image,
}: {
  name: string
  image: string | null
}) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col rounded-md border shadow-sm md:flex-row">
      <div className="border-b px-6 py-4 md:border-r">
        <div className="mb-5 flex items-center gap-2">
          <UserAvatar
            user={{
              name: name,
              image: image,
            }}
            className="h-10 w-10"
          />
          <p className="font-semibold tracking-tight text-muted-foreground">
            {name}
          </p>
        </div>
        <h4 className="mb-2 scroll-m-20 text-xl font-semibold tracking-tight">
          30 Min Meeting
        </h4>
        <div className="mb-1 flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <p className="font-semibold tracking-tight text-muted-foreground">
            30 mins
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <p className="font-semibold tracking-tight text-muted-foreground">
            $1000
          </p>
        </div>
      </div>
      <div className="border-b md:border-r">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </div>
      <div className="px-6 py-4">
        <p className="text-lg font-semibold tracking-tight">Wed 13</p>
        <div className="flex items-center justify-center rounded-md border">
          12:00
        </div>
        <div className="flex items-center justify-center rounded-md border">
          12:00
        </div>
        <div className="flex items-center justify-center rounded-md border">
          12:00
        </div>
        <div className="flex items-center justify-center rounded-md border">
          12:00
        </div>
      </div>
    </div>
  )
}
