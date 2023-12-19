import Link from "next/link"

import { getSchedule } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { EventCalendar } from "@/components/calendar/calendar"

export default async function CalendarPage() {
  const schedule = await getSchedule()

  if (!schedule || schedule.selectedDays.length === 0)
    return (
      <Card className="mx-auto max-w-md">
        <CardContent className="flex flex-col items-center justify-center space-y-4 p-6">
          <IconClock className="h-16 w-16 text-gray-500 dark:text-gray-400" />
          <h2 className="text-xl font-semibold">No Schedule Available</h2>
          <p className="text-gray-500 dark:text-gray-400">
            There are currently no events or tasks scheduled.
          </p>
          <Button asChild>
            <Link href="/provider-dashboard/calendar/config">
              Calendar Config
            </Link>
          </Button>
        </CardContent>
      </Card>
    )

  return <EventCalendar schedule={schedule} />
}

function IconClock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
