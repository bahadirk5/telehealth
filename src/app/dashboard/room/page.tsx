import { notFound } from "next/navigation"
import { auth } from "~/src/auth"

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
