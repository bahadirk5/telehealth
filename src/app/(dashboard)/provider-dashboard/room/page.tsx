import { notFound } from "next/navigation"

import { getServerAuthSession } from "@/lib/auth"
import { VideoCall } from "@/components/video-call/video-call"

export default async function Room() {
  const session = await getServerAuthSession()

  if (!session?.user) notFound()

  return (
    <>
      <VideoCall name={session.user.email} />
    </>
  )
}
