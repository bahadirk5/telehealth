import Uploader from "@/components/uploader";

export default function Overview() {
  return (
    <>
      <div className="flex flex-col space-y-6">
        <h1 className="text-3xl font-bold">Overview</h1>
      </div>
      Lorem ipsum dolor sit amet.
      <div className="space-y-10">
        <Uploader defaultValue={null} name="image" />
      </div>
    </>
  )
}
