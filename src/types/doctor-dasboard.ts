export type DoctorDashboardItem = {
  title: string
  path: string
  icon?: string
  submenu?: boolean
  subMenuItems?: DoctorDashboardItem[]
}
