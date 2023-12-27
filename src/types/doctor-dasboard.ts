import { LucideIcon } from "lucide-react"

export type DoctorDashboardItem = {
  title: string
  path: string
  icon?: LucideIcon
  submenu?: boolean
  subMenuItems?: DoctorDashboardItem[]
}
