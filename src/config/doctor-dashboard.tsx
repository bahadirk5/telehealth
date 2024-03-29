import { Calendar, KanbanSquare, Settings } from "lucide-react"

import { DoctorDashboardItem } from "@/types/doctor-dasboard"

export const SIDENAV_ITEMS: DoctorDashboardItem[] = [
  {
    title: "Overview",
    path: "/provider-dashboard",
    icon: KanbanSquare,
  },
  {
    title: "Calendar",
    path: "/provider-dashboard/calendar",
    icon: Calendar,
  },
  {
    title: "Settings",
    path: "/provider-dashboard/settings",
    icon: Settings,
  },
]
