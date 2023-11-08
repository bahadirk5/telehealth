import { notFound } from "next/navigation"
import { auth } from "~/auth"

import { VideoCall } from "@/components/video-call/video-call"

export default async function Room() {
  const session = await auth()

  if (!session?.user) notFound()

  return (
    <>
      <VideoCall name={session.user.email} />
    </>
  )
}
