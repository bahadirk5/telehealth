import { getServerAuthSession } from "@/lib/auth"

export default async function Home() {
  const session = await getServerAuthSession()

  if (session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <pre>{JSON.stringify(session.user, null, 2)}</pre>
      </main>
    )
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hi
    </main>
  )
}
