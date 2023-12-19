import { auth, signOut } from "@/auth"

import { Button } from "@/components/ui/button"

export default async function Dashboard() {
  const session = await auth()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(session?.user, null, 2)}
          </code>
        </pre>
      </h1>
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <Button type="submit">Sing out</Button>
      </form>
    </main>
  )
}
