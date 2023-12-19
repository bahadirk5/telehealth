import { DoctorDashboardItem } from "@/types/doctor-dasboard"

export const SIDENAV_ITEMS: DoctorDashboardItem[] = [
  {
    title: "Home",
    path: "/provider-dashboard",
    icon: "lucide:home",
  },
  {
    title: "Calendar",
    path: "/provider-dashboard/calendar",
    icon: "lucide:calendar",
    submenu: true,
    subMenuItems: [
      { title: "Config", path: "/provider-dashboard/calendar/config" },
      { title: "Calendar", path: "/provider-dashboard/calendar" },
    ],
  },
  {
    title: "Messages",
    path: "/messages",
    icon: "lucide:mail",
  },
  {
    title: "Settings",
    path: "/settings",
    icon: "lucide:settings",
    submenu: true,
    subMenuItems: [
      { title: "Account", path: "/settings/account" },
      { title: "Privacy", path: "/settings/privacy" },
    ],
  },
  {
    title: "Help",
    path: "/help",
    icon: "lucide:help-circle",
  },
]
