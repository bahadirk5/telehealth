import Link from "next/link"

import { getServerAuthSession } from "@/lib/auth"
import { buttonVariants } from "@/components/ui/button"

export default async function Home() {
  const session = await getServerAuthSession()

  if (session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <pre>{JSON.stringify(session.user, null, 2)}</pre>
        {session.user.role === "Client" && (
          <Link href="/become-a-provider" className={buttonVariants()}>
            Become a provider
          </Link>
        )}
      </main>
    )
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hi
    </main>
  )
}
