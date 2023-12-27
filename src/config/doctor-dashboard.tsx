import { DoctorDashboardItem } from "@/types/doctor-dasboard"
import {
  KanbanSquare,
  Calendar,
} from "lucide-react"

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
    submenu: true,
    subMenuItems: [
      { title: "Config", path: "/provider-dashboard/calendar/config" },
      { title: "Calendar", path: "/provider-dashboard/calendar" },
    ],
  },
]
