import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MultipleFileUploader } from "@/components/multiple-uploader"

export default function Overview() {
  return (
    <>
      <div className="flex flex-col space-y-6">
        <DashboardHeader
          heading="Overview"
          text="Manage appointments, track patient visits, and optimize your schedule with ease."
        ></DashboardHeader>
      </div>
      <div className="space-y-10">
        <MultipleFileUploader defaultValue={null} name="imageGallery" />
      </div>
    </>
  )
}
