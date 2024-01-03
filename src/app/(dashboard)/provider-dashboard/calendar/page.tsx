import Link from "next/link"

import { getSchedule } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { EventCalendar } from "@/components/calendar/calendar"
import { Particles } from "@/components/particals"

export default async function CalendarPage() {
  const schedule = await getSchedule()

  if (!schedule || schedule.selectedDays.length === 0)
    return (
      <div className="relative mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <Particles
          className="absolute inset-0 -z-10 opacity-50"
          quantity={30}
        />
        <div className="relative flex h-full flex-1 flex-col items-center gap-4 p-8">
          <IconClock className="h-10 w-10" />
          <h3 className="mt-2 font-semibold">No Schedule Available</h3>
          <p className="mt-1 text-sm">
            There are currently no events or tasks scheduled.
          </p>
          <Button asChild>
            <Link href="/provider-dashboard/calendar/config">
              Calendar Config
            </Link>
          </Button>
        </div>
      </div>
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
